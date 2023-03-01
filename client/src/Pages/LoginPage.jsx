import { Form, Formik } from "formik";
import React, { useState } from "react";
import { loginUserRequest } from "../api/login.api";

function LoginPage() {
  const [token, setToken] = useState("");
  return (
    <div>
      <Formik //estados iniciales
        initialValues={{
          email: "",
          password: "",
        }}
        //onsubmit evento para enviar el formulario
        onSubmit={async (values, actions) => {
          console.log(values);
          //enviamos la peticion al back
          try {
            const response = await loginUserRequest(values);
            const { token } = response.data;
            // Actualiza el valor del estado con el token recibido
            setToken(token);

            //resetea el form
            actions.resetForm();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(
          { handleChange, handleSubmit, values, isSubmitting } //handleChange :funcion para que se llene lo que escribe en los inputs gracias al evento onchange y el onsubmint es para cuando se envia el boton
        ) => (
          <Form onSubmit={handleSubmit}>
            <label>correo</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={handleChange}
              value={values.email}
            />

            <label>contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              onChange={handleChange}
              value={values.password}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando" : "Enviar"}
            </button>
            <p>
              Token: <b>{token}</b>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
