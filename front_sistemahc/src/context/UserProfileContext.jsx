import { createContext, useContext, useState, useEffect } from "react";
import ProfileService from "../services/profileService";

const UserProfileContext = createContext({});

export default function UserProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState({});
  const [idRol, setIdRol] = useState(null);
  useEffect(() => {
    const idUserProfile = localStorage.getItem("id");
    getUserProfile(idUserProfile);
  }, []);
  const getUserProfile = async (iduser) => {
    try {
      const userRol = await ProfileService.mostrar(iduser);
      setUserProfile(userRol.data);
      const rol = localStorage.getItem("rol");
      setIdRol(userRol.data.usuario[rol].id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, getUserProfile, idRol }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfileProvider = () => useContext(UserProfileContext);
