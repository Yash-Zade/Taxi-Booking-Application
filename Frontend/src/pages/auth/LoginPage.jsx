import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setActiveRole } = useContext(UserContext);
  const base_url = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        toast.success('Login Successful!');
        setIsLoggedIn(true);
        setActiveRole('RIDER');
        navigate('/');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-bold text-gray-800 mb-5 p-5">
        Welcome Back 👋
      </h2>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center border border-yellow-300">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 ease-in-out w-full mb-4"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-yellow-600 hover:underline font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
