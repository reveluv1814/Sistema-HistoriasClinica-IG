import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Historia = () => {
  //consigue el id de params
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
    <p>este es el id del paciente: {id}</p>
      <a
        onClick={() => navigate("/personal/pacientes")}
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-indigo-600 rounded-lg shadow-md group cursor-pointer bg-indigo-500 dark:bg-indigo-800 dark:border-indigo-900"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-400 dark:bg-indigo-700 group-hover:translate-x-0 ease">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          Atrás
        </span>
        <span className="relative invisible">Atrás</span>
      </a>
      <div>Historia</div>
    </>
  );
};

export default Historia;
