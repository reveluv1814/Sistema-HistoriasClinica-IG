import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { changePassword } from "../api/login.api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.token) {
      setTokenIsValid(true);
    } else {
      navigate("/"); // redirige a otra vista si no hay token en la URL
    }
  }, []);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Este campo es requerido.")
      .min(5, "La contraseña debe tener al menos 5 caracteres."),
    confirmPassword: Yup.string()
      .required("Este campo es requerido.")
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden."),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const response = {
        token: params.token,
        newPassword: values.newPassword,
      };
      console.log(response);
      const rta = await changePassword(response);
      console.log(rta);
      alert("Se cambio la contraseña Exitosamente");
      navigate("/");
      resetForm();
    } catch (error) {
      alert("Error vuelve intentar dentro de 5 min");
      navigate("/");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { handleChange, handleSubmit, values, errors, touched, resetForm } =
    formik;

  if (!tokenIsValid) {
    return <div>No tienes acceso a esta vista.</div>;
  }

  return (
    <div className=" flex flex-col items-center justify-center h-full ">
      <h2 className="text-4xl font-normal text-red-500 ">
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="newPassword"
            >
              Nueva contraseña:
            </label>
            <input
              className={`shadow appearance-none border bg-stone-200 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.newPassword && touched.newPassword
                  ? "border-red-500"
                  : ""
              }`}
              id="newPassword"
              type="password"
              placeholder="********"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              value={values.newPassword}
            />
            {errors.newPassword && touched.newPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.newPassword}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar contraseña:
            </label>
            <input
              className={`shadow appearance-none border rounded-lg w-full bg-stone-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              id="confirmPassword"
              type="password"
              placeholder="********"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:text-sm sm:w-auto sm:mx-2 min-w-20"
              type="submit"
              disabled={formik.isValidating || !formik.isValid}
            >
              Cambiar contraseña
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:text-sm sm:w-auto sm:mx-2 min-w-20" 
              type="button"
              onClick={resetForm}
            >
              Restaurar
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
