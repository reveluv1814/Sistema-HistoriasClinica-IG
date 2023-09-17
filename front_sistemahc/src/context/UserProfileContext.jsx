import { createContext, useContext, useState, useEffect } from "react";
import citaService from "../services/citaService";

const UserProfileContext = createContext({});

export default function UserProfileProvider({ children }) {
  const [citaValue, setCitaValue] = useState({});
  
  const getCitaValue = async (iduser) => {
    try {
      const citaVa = await citaService.mostrar(iduser);
      //console.log(citaVa)
      const fechaFormateada = new Date(citaVa.data.fecha).toISOString().split('T')[0];
      setCitaValue({cita:{
        fecha:fechaFormateada,
        hora: citaVa.data.hora,
        doctorId: citaVa.data.doctorId, 
      }});
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{ getCitaValue,citaValue,setCitaValue }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfileProvider = () => useContext(UserProfileContext);
