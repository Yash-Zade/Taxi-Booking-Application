import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const { accessToken } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [activeRole, setActiveRole] = useState(() => localStorage.getItem("activeRole") || "");
    const base_url =  import.meta.env.VITE_BASE_URL;
    let url = null;
    if(activeRole == "ADMIN"){
      url = `${base_url}/admin/getMyProfile`
    }
    else if(activeRole == "DRIVER"){
      url = `${base_url}/driver/getMyProfile`
    }
    else{
      url = `${base_url}/rider/getMyProfile`
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(url, {
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

    useEffect(() => {
      if (activeRole) {
        localStorage.setItem("activeRole", activeRole);
      }
    }, [activeRole]);
    

    return(
        <UserContext.Provider value={{userProfile,setUserProfile,activeRole, setActiveRole}}>
            {children}
        </UserContext.Provider>
    );

}