import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Create Authentication Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
    const navigate = useNavigate();
    const base_url = 'http://localhost:8080';

    // Check and refresh token upon mounting
    useEffect(() => {
        checkAndRefreshToken();
        setupAxiosInterceptors();
    }, [accessToken]);

    // Function to check and refresh token if needed
    const checkAndRefreshToken = async () => {
        if (!accessToken) {
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            return;
        }

        try {
            const decoded = jwtDecode(accessToken);
            const now = Date.now() / 1000;

            if (decoded.exp <= now) {
                // Token expired, attempt to refresh
                const newToken = await refreshAccessToken();
                if (!newToken) {
                    logout();
                }
            } else {
                // Token is still valid
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            logout();
        }
    };

    // Refresh access token using the refresh token
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${base_url}/auth/refresh`,{},{ withCredentials: true } )
            const newToken = response.data.data.accessToken; // Ensure correct path
    
            if (newToken) {
                updateAccessToken(newToken);
                return newToken;
            }
            return null;
        } catch (err) {
            logout();  // Force logout if refresh fails
            return null;
        }
    };
    
    // Logout function to clear authentication state
    const logout = () => {
        setAccessToken('');
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    // Function to update access token safely
    const updateAccessToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('accessToken', newToken);
            setAccessToken(newToken);
            setIsLoggedIn(true);
        } else {
            logout();
        }
    };

    // Axios Interceptor: Automatically refresh token before requests to protected routes
    const setupAxiosInterceptors = () => {
        axios.interceptors.request.use(
            async (config) => {
                // Skip adding token to non-protected routes
                if (!config.headers.Authorization) {
                    return config;
                }

                if (!accessToken) {
                    logout();
                    throw new Error("No access token found");
                }

                try {
                    const decoded = jwtDecode(accessToken);
                    const now = Date.now() / 1000;

                    if (decoded.exp <= now) {
                        const newToken = await refreshAccessToken();
                        if (!newToken) {
                            logout();
                            throw new Error("Failed to refresh access token");
                        }
                        config.headers.Authorization = `Bearer ${newToken}`;
                    } else {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }

                    return config;
                } catch (error) {
                    console.error("Error decoding token:", error);
                    logout();
                    throw error;
                }
            },
            (error) => Promise.reject(error)
        );
    };

    return (
        <AuthContext.Provider value={{ accessToken, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
