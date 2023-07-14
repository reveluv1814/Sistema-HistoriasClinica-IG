import React, { useState, useEffect } from "react";
import FormChangePass from "./LoginComponents/FormChangePass";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.token) {
      setTokenIsValid(true);
    } else {
      navigate("/"); // redirige a otra vista si no hay token en la URL
    }
  }, []);
  if (!tokenIsValid) {
    return <div>No tienes acceso a esta vista.</div>;
  } 

  return (
    <>
      <div className=" flex flex-col items-center justify-center h-full ">
        <h2 className="text-3xl font-semibold text-neutral-600 mt-20">
          Introduzca su nueva Contraseña
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-blue-500 font-extrabold mt-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>

        <div className="bg-white rounded-3xl w-[20%] p-5 mt-5 shadow-xl">
          <FormChangePass />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
