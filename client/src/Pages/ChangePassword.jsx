import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { changePassword } from "../api/login.api";
import Modal from "../Components/Modal/Modal";

const ChangePassword = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
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

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const rta = await changePassword(response);
      setSuccess(true);
      resetForm();
    } catch (error) {
      setShow(true);
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
    <>
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
      <Modal
        title="Error"
        onClose={() => setShow(false)}
        show={show}
        contenido={" shadow-md shadow-rose-500/40"}
        button={"bg-rose-500 hover:bg-rose-700"}
        botonTitle={"Cerrar"}
        buttonAction={"/"}
      >
        <p className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-28 h-13 mx-auto text-rose-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <p className="text-center font-normal text-xl">
          Error al cambiar la contraseña!!!
        </p>
        <p className="text-center text-sm font-normal text-red-800">
          Paso algo
        </p>
        <p className="text-center text-base font-normal">
          Error, vuelve intentar dentro de 5 min
        </p>
      </Modal>
      <Modal
        title="Cambiado con Exito"
        onClose={() => setSuccess(false)}
        show={success}
        contenido={" shadow-md shadow-emerald-500/40"}
        button={"bg-emerald-500 hover:bg-emerald-700"}
        botonTitle={"Aceptar"}
        buttonAction={"/"}
      >
        <p className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-28 h-13 mx-auto text-emerald-700"
          >
            <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
          </svg>
        </p>
        <p className="text-center text-base font-normal mt-5">
          Se cambio la contraseña Exitosamente
        </p>
        <p className="text-center text-sm font-normal text-emerald-700">
          Cierra y vuelva a ingresar al sistema.
        </p>
      </Modal>
    </>
  );
};

export default ChangePassword;
