import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RecoveryRequest } from "../api/login.api";
import Modal from "../Components/Modal/Modal";

localStorage.removeItem("token");

const initialValues = {
  email: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo requerido"),
});

const RecoveryPage = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await RecoveryRequest(values);
      setSuccess(true);
      resetForm();
    } catch (error) {
      setShow(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          errors,
          touched,
        }) => (
          <div className="flex h-[65%] flex-col items-center justify-center">
            <h2 className="text-4xl font-normal text-red-500 mb-1">
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
              <h2 className="font-bold text-2xl mb-5">
                Correo Electronico de Recuperación
              </h2>
              <Form className="flex flex-col items-center">
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
            </div>
          </div>
        )}
      </Formik>
      <Modal
        title="Error"
        onClose={() => setShow(false)}
        show={show}
        contenido={" shadow-md shadow-rose-500/40"}
        button={"bg-rose-500 hover:bg-rose-700"}
        botonTitle={"Cerrar"}
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
        title="Enviado con Exito"
        onClose={() => setSuccess(false)}
        show={success}
        contenido={" shadow-md shadow-emerald-500/40"}
        button={"bg-emerald-500 hover:bg-emerald-700"}
        botonTitle={"Aceptar"}
        buttonAction= {("/")}
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
          El correo fue enviado exitosamente
        </p>
        <p className="text-center text-sm font-normal text-emerald-700">
          Revisa tu bandeja de entrada
        </p>
        
      </Modal>
    </>
  );
};

export default RecoveryPage;
