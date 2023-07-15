import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import Modal from "../../components/Modal";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Este campo es requerido.")
    .min(5, "La contraseña debe tener al menos 5 caracteres."),
  confirmPassword: Yup.string()
    .required("Este campo es requerido.")
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden."),
});
const FormChangePass = () => {
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
  }
  if (localStorage.getItem("rol")) {
    localStorage.removeItem("rol");
  }
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);
  const resetModalError = () => {
    setShowError(false);
  };
  const resetModalSuccess = () => {
    setSuccess(false);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const response = {
        token: params.token,
        newPassword: values.newPassword,
      };
      const { data } = await authService.changePass(response);
      setSuccess(true);
      actions.resetForm();
    } catch (error) {
      setShowError(true);
      console.error(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          resetForm,
        }) => (
          <>
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="newPassword"
                >
                  Nueva contraseña:
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className={`shadow appearance-none border bg-stone-200 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={handleChange}
                  value={values.newPassword}
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-center text-red-500 text-xs italic"
                />{" "}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmar contraseña:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`shadow appearance-none border rounded-lg w-full bg-stone-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-center text-red-500 text-xs italic"
                />{" "}
              </div>
              <div className="flex flex-col items-center justify-between md:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:text-sm sm:w-auto sm:mx-2 min-w-20"
                >
                  {" "}
                  {isSubmitting ? "Enviando" : "Cambiar contraseña"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:text-sm sm:w-auto sm:mx-2 min-w-20"
                  type="button"
                  onClick={resetForm}
                >
                  Restaurar
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      <Modal
        modalOpen={showError}
        setOpenModal={resetModalError}
        title="Error"
        contenido={" shadow-md shadow-rose-500/40"}
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
        <div className="flex justify-center">
          <Link
            className="text-center justify-center items-center bg-rose-700 py-2 px-4 rounded-lg text-white font-semibold mt-5"
            to={"/"}
          >
            Aceptar
          </Link>
        </div>
      </Modal>
      <Modal
        modalOpen={success}
        setOpenModal={resetModalSuccess}
        title="Cambiado con Exito"
        contenido={" shadow-md shadow-emerald-500/40"}
      >
        <p className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-28 h-13 mx-auto text-emerald-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </p>
        <p className="text-center text-base font-normal mt-5">
          Se cambio la contraseña Exitosamente
        </p>
        <p className="text-center text-sm font-normal text-emerald-700">
          Cierra la ventana y vuelva a ingresar al sistema.
        </p>
        <div className="flex justify-center">
          <Link
            className="text-center justify-center items-center bg-emerald-700 py-2 px-4 rounded-lg text-white font-semibold mt-5"
            to={"/"}
          >
            Aceptar
          </Link>
        </div>
      </Modal>
    </>
  );
};
export default FormChangePass;
