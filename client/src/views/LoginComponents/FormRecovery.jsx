import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import Modal from "../../components/Modal";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo invalido").required("Campo requerido"),
});
const FormRecovery = () => {
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
      const { data } = await authService.recovery(values);
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
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit, isSubmitting, touched }) => (
          <>
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <label htmlFor="email" className="mb-1 text-lg font-medium">
                Correo:
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`p-2 shadow appearance-none border bg-stone-200 rounded-lg ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-center text-red-500 text-xs italic"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-500 to-indigo-500 text-white p-2 rounded-xl mt-4 w-[50%] font-bold shadow-xl"
              >
                {isSubmitting ? "Enviando" : "Enviar"}
              </button>
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
          Correo No encontrado!!!
        </p>
        <p className="text-center text-sm font-normal text-red-800">
          Correo no encontrado
        </p>
        <p className="text-center text-base font-normal">
          Introduce el correo con el que te registraste
        </p>
      </Modal>
      <Modal
        modalOpen={success}
        setOpenModal={resetModalSuccess}
        title="Enviado con Exito"
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
          El correo fue enviado exitosamente
        </p>
        <p className="text-center text-sm font-normal text-emerald-700">
          Revisa tu bandeja de entrada
        </p>
        <div className="flex justify-center">
          <Link
            className="text-center justify-center items-center bg-emerald-700 py-2 px-4 rounded-lg text-white font-semibold mt-5"
            to={"/"}
          >
            Volver a inicio
          </Link>
        </div>
      </Modal>
    </>
  );
};
export default FormRecovery;
