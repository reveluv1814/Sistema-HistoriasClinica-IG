import { createContext, useContext, useState, useEffect } from "react";
import { AdminPageContex } from "./AdminPageContext";
import nameFormat from "../libs/names.lib";
import { getUsers, postUsers, deleteUser, getUserId,patchUser } from "./../api/login.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import CardUser from "./../Components/Cards/CardUsuario";
import Modal from "./../Components/Modal/Modal";
import ModalAdd from "./../Components/Modal/ModalAdd";
import UserFormUpdate from "./../Components/Forms/FormUserUpdate";

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

  //usuarios
  const [usuarios, setUsuarios] = useState([]);
  //para activar card
  const [cardUser, setCardUser] = useState(null);
  const [show, setShow] = useState(false);
  //para activar form de actualizar
  const [showUpdate, setShowUpdate] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(
    () => {
      getDataUsers();
    },
    [
      /*usuarios*/
    ]
  );
  //peticion de usuarios
  async function getDataUsers() {
    try {
      const response = await getUsers(token);
      setUsuarios(response);
    } catch (error) {
      console.log(error);
    }
  }
  //peticion para ver un usuario
  const getUser = async (id) => {
    try {
      const response = await getUserId(token, id);
      setCardUser(response.data);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  //actualizar usuario:
  const updateUsuario = async (id,values) => {
    try {
      const response = await patchUser(token, id,values);
      //setUserId(null)
      getDataUsers();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    setShowUpdate(true);
    try {
      const res = await getUserId(token, id);
      setUserId(res.data.usuario);
    } catch (error) {
      console.log(error);
    }
  };
  //crea usuario
  const postUsuario = async (values) => {
    const response = await postUsers(token, values);
    if (response.status === 201) {
      getDataUsers();
    }
    return response;
  };
  //delete usuarios
  const deleteUserC = async (id) => {
    try {
      const response = await deleteUser(token, id);
      getDataUsers();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //state para cambier el boton al agregar personas
  const [closeModalSucces, setCloseModalSucces] = useState(false);
  //state para ver si hay mas de cuatro usaurios para que ponga el scroll en la tabla
  const [countUser, setCountUser] = useState(false);
  useEffect(() => {
    usuarios?.data?.usuarios?.length >= 4
      ? setCountUser(true)
      : setCountUser(false);
  }, [usuarios]);

  //tabla de usuarios
  const bodyTableAdmin = function (/*payload,*/ actions) {
    return (
      <>
        {usuarios.data ? (
          <tbody className="block flex-shrink-0 flex-grow-0 flex-basis-auto overflow-y-auto h-80">
            {usuarios.data.usuarios.map((element) => {
              return (
                <tr
                  key={element.id}
                  className="font-medium table table-fixed w-full"
                >
                  <td className="pt-1 pb-1 pl-5 pr-5 text-center capitalize border-b border-r border-gray-300">
                    {nameFormat(element)}
                  </td>
                  <td className="pt-3 pb-3 pl-5 pr-5 text-center border-b border-r border-gray-300">
                    {element.rol}
                  </td>
                  <td className="pt-3 pb-3 pl-5 pr-5 text-center border-b border-r border-gray-300">
                    {element.email}
                  </td>
                  <td className=" pt-5 pb-5 pl-4 pr-4 text-center border-b border-r border-gray-300 tablaAdminUsers ">
                    <button
                      onClick={() => handleUpdate(element.id)}
                      className="rounded-md text-white bg-emerald-500 pt-2 pb-2 pl-3 pr-3 mr-2 capitalize shadow-md hover:bg-emerald-700"
                    >
                      {actions[0]}
                    </button>
                    <ModalAdd
                      title="Actualizar Usuario"
                      onClose={() => {
                          setUserId(null);
                          setShowUpdate(false);
                      }}
                      show={showUpdate}
                      contenido={" shadow-md"}
                      button={"bg-rose-500 hover:bg-rose-700"}
                      botonTitle={`${
                        closeModalSucces ? "Cerrar " : "X Cancelar"
                      }`}
                    >
                     {userId!==null &&(<UserFormUpdate />)} 
                    </ModalAdd>
                    <button
                      onClick={() => deleteUserC(element.id)}
                      className="rounded-md text-white bg-rose-500 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-rose-700"
                    >
                      {actions[1]}
                    </button>
                    <button
                      onClick={() => getUser(element.id)}
                      className="rounded-md text-white text-center bg-sky-700 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-sky-500"
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="w-4 h-4  text-white mr-1"
                      />
                      {actions[2]}
                    </button>

                    <Modal
                      title="Usuario"
                      onClose={() => setShow(false)}
                      show={show}
                      contenido={" shadow-md shadow-gray-500/40 w-[600px]"}
                      button={"bg-rose-500 hover:bg-rose-700"}
                      botonTitle={"Cerrar"}
                    >
                      <CardUser user={cardUser} />
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr className="text-center justify-center p-10">
              <td className="font-medium text-xl ">
                No hay usuarios por el momento
              </td>
            </tr>
          </tbody>
        )}
      </>
    );
  };

  return (
    <AdminPageContex.Provider
      value={{
        bodyTableAdmin,
        closeModalSucces,
        setCloseModalSucces,
        getDataUsers,
        postUsuario,
        countUser,
        updateUsuario,
        userId,
      }}
    >
      {children}
    </AdminPageContex.Provider>
  );
};
