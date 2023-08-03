import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import Modal from "../../components/Modal";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo invalido").required("Campo requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener 6 caracteres o más caracteres")
    .required("Campo requerido"),
});
const LoginForm = () => {
  //e.preventDefault()
  const navigate = useNavigate();
  const [modalOpen, setOpenModal] = useState(false);
  const resetData = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await authService.loginConNode(values);

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("rol", data.user.rol);
      const rol = localStorage.getItem("rol");

      switch (rol) {
        case "admin":
          navigate("/admin");
          break;
        case "personalAdmin":
          navigate("/personal");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "laboratorista":
          navigate("/laboratorista");
          break;
        default:
          // En caso de que el rol no coincida con ninguno de los casos anteriores, redirigir al usuario a "/"
          navigate("/");
          break;
      }
      actions.resetForm();
    } catch (error) {
      setOpenModal(true);
      console.error(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", seepass: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <>
            <Form onSubmit={handleSubmit} className="flex flex-col">
              <label className="font-semibold text-lg">Correo:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                onChange={handleChange}
                value={values.email}
                className="border-none focus:outline-none rounded-md pl-3 mt-2"
              />
              <div className="div-container">
                {" "}
                {errors.email ? (
                  <p className="text-xs font-semibold text-red-800">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <label className="font-semibold text-lg ">Contraseña:</label>

              <div className="flex flex-row">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="contraseña"
                  onChange={handleChange}
                  value={values.password}
                  className="border-none focus:outline-none rounded-md pl-3 mt-2"
                />
                <svg
                  className="ml-2 mt-3 w-6 h-7 see"
                  onClick={() => {
                    if (!values.seepass) {
                      document
                        .getElementById("password")
                        .setAttribute("type", "text");
                      values.seepass = true;
                    } else {
                      document
                        .getElementById("password")
                        .setAttribute("type", "password");
                      values.seepass = false;
                    }
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
              {errors.password ? (
                <p className="flex flex-col text-xs font-semibold text-red-800 ">
                  {errors.password}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btlogin bg-gradient-to-r from-red-500 to-indigo-600 text-white py-2 px-4 rounded-xl mt-4"
              >
                {isSubmitting ? "Iniciando Sesión" : "Iniciar Sesión"}
              </button>
              <p className="mt-6 text-right font-thin text-sm underline hover:font-normal">
                <Link to={"recovery/recovery-password"}>
                  Olvido su contraseña?
                </Link>
              </p>
            </Form>
          </>
        )}
      </Formik>
      <Modal
        modalOpen={modalOpen}
        setOpenModal={resetData}
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
          Usuario No encontrado!!!
        </p>
        <p className="text-center text-sm font-normal text-red-800">
          Correo o Contraseña incorrecta
        </p>
        <p className="text-center text-base font-normal">
          Vuelva a ingresar los datos correctos
        </p>
      </Modal>
    </>
  );
};
export default LoginForm;
