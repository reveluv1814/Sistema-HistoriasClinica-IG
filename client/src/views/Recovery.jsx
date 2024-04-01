import React from "react";
import FormRecovery from "./LoginComponents/FormRecovery";

const Recovery = () => {
  localStorage.clear();
  return (
    <>
      <div className="flex h-[65%] flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-neutral-600 mb-1 mt-20">
          Introduzca su Correo de Recuperación
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12  text-blue-500 font-extrabold mt-4 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>

        <div className="bg-white rounded-3xl w-[30%]  flex flex-col p-10 items-center shadow-2xl">
          <h2 className="font-bold text-xl mb-5">
            Correo Electronico de Recuperación
          </h2>
          <FormRecovery />
        </div>
      </div>
    </>
  );
};

export default Recovery;
