import React from "react";
import { useAdminPage } from "../Context/AdminPageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalAdd from "./Modal/ModalAdd";
import UserForm from "./Forms/FormUser";
import nameFormat from "./../libs/names.lib";

const TableUsers = (props) => {
  const { payloadColumn, actions, payload, isIndex = false } = props;
  const { bodyTableAdmin, setCloseModalSucces, closeModalSucces } =
    useAdminPage();
  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-center items-center mt-8">
      <table className=" rounded-xl shadow-lg flex flex-col w-[60%]">
        <thead className="flex-auto ">
          <tr className=" bg-gray-200 table table-fixed theadd tablaAdmin">
            {payloadColumn.map((element, index) => (
              <th
                key={index}
                className="text-center  capitalize p-4 border-b border-r border-r-gray-300 border-b-gray-400"
              >
                {element}
              </th>
            ))}
          </tr>
        </thead>

        {bodyTableAdmin(payload, actions)}
        
        {/* <tbody className="block flex-shrink-0 flex-grow-0 flex-basis-auto overflow-y-auto h-80">
          {payload.usuarios.map((element) => {
            //console.log(element);
            return (
              <div className="">
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
                    <button className="rounded-md bg-rose-500 pt-2 pb-2 pl-3 pr-3 ml-2 capitalize shadow-md hover:bg-rose-700">
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
              </div>
            );
          })}
        </tbody> */}

        <tfoot className="flex-auto theadd">
          <tr className=" bg-gray-200 table table-fixed w-full tablaAdminFooter">
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
