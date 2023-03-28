import { createContext, useContext,useState } from "react";
import { AdminPageContex } from "./AdminPageContext";
import nameFormat from "../libs/names.lib";

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

  const [closeModalSucces, setCloseModalSucces] = useState(false);
  const bodyTableAdmin = function (payload, actions) {
    return (
      <tbody>
        {payload.usuarios.map((element) => {
          //console.log(element);
          return (
            <tr key={element.id} className="font-normal ">
              <td className="pt-6 pb-6 pl-10 pr-10 text-center capitalize border-b border-r border-gray-300">
                {nameFormat(element)}
              </td>
              <td className="pt-6 pb-6 pl-10 pr-10 text-center border-b border-r border-gray-300">
                {element.rol}
              </td>
              <td className="pt-6 pb-6 pl-10 pr-10 text-center border-b border-r border-gray-300">
                {element.email}
              </td>
              <td className="pt-6 pb-6 pl-5 pr-5 text-center border-b border-r border-gray-300 tablaAdminUsers text-white">
                <button className="rounded-md  bg-emerald-500 pt-2 pb-2 pl-3 pr-3 mr-2 capitalize shadow-md hover:bg-emerald-700">
                  {actions[0]}
                </button>
                <button className="rounded-md bg-rose-500 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-rose-700">
                  {actions[1]}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };



  return (
    <AdminPageContex.Provider value={{ bodyTableAdmin,closeModalSucces,setCloseModalSucces }}>
      {children}
    </AdminPageContex.Provider>
  );
};
