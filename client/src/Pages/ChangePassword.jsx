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
      console.log(response)
      const rta = await changePassword(response);
      console.log(rta)
      alert("Se cambio la contraseña Exitosamente");
      navigate("/");
      resetForm();
    } catch (error) {
      alert("Error vuelve intentar dentro de 5 min");
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="newPassword"
        >
          Nueva contraseña
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.newPassword && touched.newPassword ? "border-red-500" : ""
          }`}
          id="newPassword"
          type="password"
          placeholder="********"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          value={values.newPassword}
        />
        {errors.newPassword && touched.newPassword && (
          <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirmar contraseña
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={formik.isValidating || !formik.isValid }
        >
          Cambiar contraseña
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={resetForm}
        >
          Restaurar
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
