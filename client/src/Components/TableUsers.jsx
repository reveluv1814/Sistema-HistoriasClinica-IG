import React from "react";
import { useAdminPage } from "../Context/AdminPageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalAdd from "./Modal/ModalAdd";
import UserForm from "./Forms/FormUser";

const TableUsers = (props) => {
  const { payloadColumn, actions, isIndex = false } = props;
  const { bodyTableAdmin, setCloseModalSucces, closeModalSucces, countUser } =
    useAdminPage();
  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-center items-center mt-8">
      <table className=" rounded-xl shadow-lg flex flex-col w-[60%]">
        <thead className="flex-auto ">
          <tr
            className={`bg-gray-200 table table-fixed tablaAdmin ${
              countUser ? "theadd" : "w-full rounded-tr-xl"
            }`}
          >
            {payloadColumn.map((element, index) => (
              <th
                key={index}
                className="text-center  capitalize p-4 border-b border-r border-r-gray-300 border-b-gray-400 tablaAdmin"
              >
                {element}
              </th>
            ))}
          </tr>
        </thead>

        {bodyTableAdmin(actions)}

        <tfoot className={`flex-auto ${countUser ? "theadd" : ""}`}>
          <tr
            className={`bg-gray-200 table table-fixed w-full tablaAdminFooter ${
              countUser ? "" : "rounded-b-xl"
            }`}
          >
            {isIndex ? (
              <td colSpan="1" className=" border-t border-t-gray-400">
                <div className="pagination tablaAdminFooter">
                  <a href="#">&laquo;</a>
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">4</a>
                  <a href="#">&raquo;</a>
                </div>
              </td>
            ) : (
              <td colSpan="1" className=" border-t border-t-gray-400 "></td>
            )}
            <td colSpan="3" className=" border-t border-t-gray-400 p-6 pr-10">
              <button
                className="flex flex-row ml-auto bg-sky-500 pl-0 justify-center items-center text-center font-medium text-white pr-3 rounded-md shadow-lg hover:bg-sky-700"
                onClick={() => {
                  setShow(true);
                  setCloseModalSucces(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="w-8 h-8 bg-sky-700 p-1 text-white mr-2 rounded-tl-md rounded-bl-md"
                />
                Añadir usuario
              </button>
              <ModalAdd
                title="Añadir Usuario"
                onClose={() => setShow(false)}
                show={show}
                contenido={" shadow-md"}
                button={"bg-rose-500 hover:bg-rose-700"}
                botonTitle={`${closeModalSucces ? "Cerrar " : "X Cancelar"}`}
              >
                <UserForm />
              </ModalAdd>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableUsers;
