import { Form, Formik } from "formik";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserRequest } from "../api/login.api";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { contextUser } from "../hooks/context/ContextUser";

function LoginPage(props) {

  const {setUser} = useContext(contextUser);

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex w-full h-[86%]">
      <div className="w-1/2 fondologin">
        <div className="flex h-[100%] items-center justify-center">
          <h1 className="text-6xl font-bold text-white titulologin leading-[96px]">
            Sistema de <br /> Administración de <br /> Historias Clínicas
          </h1>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center pt-14">
        <div className="">
          <img className="h-44" src="./../../iglogo.png" alt="" />
        </div>
        <div className="bg-[#dcdbdb] rounded-3xl w-[40%] h-96 flex flex-col items-center shadow-2xl">
          <div className="userlogin h-24 w-52 mt-5"></div>
          <div className="pt-3 pb-3">
            <Formik //estados iniciales
              initialValues={{
                email: "",
                password: "",
                seepass: false,
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Correo invalido")
                  .required("Campo requerido"),
                password: Yup.string()
                  .min(5, "Debe tener 5 caracteres o más")
                  .required("Campo requerido"),
              })}
              //onsubmit evento para enviar el formulario
              onSubmit={async (values, actions) => {
                //  console.log(values);
                //enviamos la peticion al back
                try {
                  const response = await loginUserRequest(values);
                  const { token } = response.data;
                  setToken(token);
                  localStorage.setItem("token", token);
                  setUser(
                    {
                      rol: response.data.user.rol
                    })
                  navigate("/admin");
                  
                  //resetea el form
                  actions.resetForm();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {(
                {
                  handleChange,
                  handleSubmit,
                  values,
                  isSubmitting,
                  touched,
                  errors,
                } //handleChange :funcion para que se llene lo que escribe en los inputs gracias al evento onchange y el onsubmint es para cuando se envia el boton
              ) => (
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
                  {touched.email && errors.email ? (
                    <p className="text-xs font-semibold text-red-800">{errors.email}</p>
                  ) : null}

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
                      className="ml-2 mt-2 w-5 h-6 see"
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
                  {touched.password && errors.password ? (
                      <p className="flex flex-col text-xs font-semibold text-red-800">{errors.password}</p>
                    ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btlogin bg-gradient-to-r from-red-500 to-indigo-600 text-white py-2 px-4 rounded-xl mt-4"
                  >
                    {isSubmitting ? "Guardando" : "Enviar"}
                  </button>
                  <p className="mt-6 text-right font-thin text-sm underline hover:font-normal">
                    <Link to={"/recovery"}>
                      Olvido su contraseña? <b>{token}</b>
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
