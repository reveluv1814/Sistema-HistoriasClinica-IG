import { createContext, useContext, useState } from "react";
import { AdminPageContex } from "./AdminPageContext";
import nameFormat from "../libs/names.lib";
import {deleteUser} from './../api/login.api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


//me creo mi hook para no importar dos bibliotecas
export const useAdminPage = () => {
  const context = useContext(AdminPageContex);
  if (!context) {
    throw new Error(
      "el hook useAdminPage debe estar dentro de AdminPageContexProvider"
    );
  }
  return context;
};

export const AdminPageContexProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const deleteUserC=async(id)=>{
    try {
      //const response = await deleteUser(token,id)
    console.log(id)
    } catch (error) {
      console.log(error)
    }
    
  }

  const [closeModalSucces, setCloseModalSucces] = useState(false);
  const bodyTableAdmin = function (payload, actions) {
    return (
      <tbody className="block flex-shrink-0 flex-grow-0 flex-basis-auto overflow-y-auto h-80">
        {payload.usuarios.map((element) => {
          return (
            <tr
              key={element.id}
              className="font-medium table table-fixed w-full"
            >
              <td className="pt-6 pb-6 pl-10 pr-10 text-center capitalize border-b border-r border-gray-300">
                {nameFormat(element)}
              </td>
              <td className=" pt-6 pb-6 pl-10 pr-10 text-center border-b border-r border-gray-300">
                {element.rol}
              </td>
              <td className=" pt-6 pb-6 pl-10 pr-10 text-center border-b border-r border-gray-300">
                {element.email}
              </td>
              <td className=" pt-5 pb-5 pl-4 pr-4 text-center border-b border-r border-gray-300 tablaAdminUsers text-white">
                <button className="rounded-md  bg-emerald-500 pt-2 pb-2 pl-3 pr-3 mr-2 capitalize shadow-md hover:bg-emerald-700">
                  {actions[0]}
                </button>
                <button onClick={() => deleteUserC(element.id)} className="rounded-md bg-rose-500 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-rose-700">
                  {actions[1]}
                </button>
                <button className="rounded-md text-center bg-sky-700 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-sky-500">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-4 h-4  text-white mr-1"
                  />
                  {actions[2]}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <AdminPageContex.Provider
      value={{ bodyTableAdmin, closeModalSucces, setCloseModalSucces }}
    >
      {children}
    </AdminPageContex.Provider>
  );
};
