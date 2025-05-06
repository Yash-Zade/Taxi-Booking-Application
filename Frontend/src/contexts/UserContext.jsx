import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const { accessToken } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const base_url = 'http://localhost:8080';
  
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/rider/getMyProfile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };  
  
    useEffect(() => {
      if (accessToken) {
        fetchProfile();
      }
    }, [accessToken]);


    return(
        <UserContext.Provider value={{userProfile,setUserProfile}}>
            {children}
        </UserContext.Provider>
    );

}