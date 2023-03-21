import React from "react";
import nameFormat from "../libs/names.lib";
import { useAdminPage } from "../Context/AdminPageProvider";

const TableUsers = (props) => {
  const { payloadColumn, actions, payload, isIndex = false } = props;
  const { bodyTableAdmin } = useAdminPage();

  return (
    <div className="items-center mt-8">
      <table className="mx-auto rounded-xl shadow-lg">
        <thead className=" ">
          <tr className=" bg-gray-200">
            {payloadColumn.map((element, index) => (
              <th
                key={index}
                className="text-center tablaAdmin capitalize p-4 border-b border-r border-r-gray-300 border-b-gray-400"
              >
                {element}
              </th>
            ))}
          </tr>
        </thead>

        {bodyTableAdmin(payload, actions)}
        {/* <tbody>
          {payload.usuarios.map((element) => {
            //console.log(element);
            return (
              <tr key={element.id}>
                <td>{nameFormat(element)}</td>
                <td>{element.rol}</td>
                <td>{element.email}</td>
                <td>{actions[0]}</td>
                <td>{actions[1]}</td>
              </tr>
            );
          })}
        </tbody> */}

        <tfoot >
          <tr className=" bg-gray-200">
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
              <td colSpan="1" className=" border-t border-t-gray-400 tablaAdminFooter"></td>
            )}
            <td colSpan="3" className=" border-t border-t-gray-400 tablaAdminFooter p-6 pr-10">
              <button className="flex flex-row ml-auto bg-sky-500 pl-0 justify-center items-center text-center font-medium text-white pr-3 rounded-md shadow-lg hover:bg-sky-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 bg-sky-700 p-1 text-white mr-2 rounded-tl-md rounded-bl-md"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                + Add User
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableUsers;
