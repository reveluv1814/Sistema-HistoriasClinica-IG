import Table from "../Components/TableUsers";
import React from "react";
import { useState, useEffect } from "react";
import { getUsers } from "./../api/login.api";
import { AdminPageContexProvider } from "../Context/AdminPageProvider";

function AdminPage() {
  
  return (
    <AdminPageContexProvider>
      <div className="flex flex-col justify-center items-center text-center h-[auto] mb-[10%]">
        <div className="mt-16">
          <h2 className="textAdminPage text-5xl">Usuarios del Sistema</h2>
        </div>
        <div className="relative w-[15%] shadow-md mt-7">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none"
            placeholder="Buscar"
          />
          <button type="submit" className="absolute top-0 right-0 mt-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <Table
          payloadColumn={["nombre", "rol", "email", "opciones"]}
          actions={["editar", "eliminar", "ver"]}
        />
      </div>
    </AdminPageContexProvider>
  );
}

export default AdminPage;
