import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../layouts/css/additional-styles/sistema.css";

const FormAdduser = ({
  setOpenModal,
  userValue,
  userService,
  listar,
  editUser,
  idEdit,
}) => {
  const [step, setStep] = useState(1);
  const [showError, setShowError] = useState(false);
  const [stepsLine, setStepLine] = useState({
    stpesCount: [1, 2, 3],
    currentStep: 1,
  });

  //yup
  const validationSchema = Yup.object({
    usuario: Yup.object({
      email: Yup.string()
        .email("Ingrese un email válido")
        .required("Campo requerido"),
      password: editUser
        ? Yup.string().strip()
        : Yup.string()
            .required("Campo requerido")
            .min(5, "La contraseña debe tener al menos 5 caracteres"),
    }),
    persona: Yup.object({
      nombre: Yup.string().required("Campo requerido"),
      apellidoMaterno: Yup.string().required("Campo requerido"),
      apellidoPaterno: Yup.string().required("Campo requerido"),
      ci: Yup.string()
        .required("Campo requerido")
        .min(5, "Debe tener al menos 5 caracteres"),
      telefono: Yup.string()
        .required("Campo requerido")
        .matches(/^\d+$/, "Debe contener solo números"),
      direccion: Yup.string().required("Campo requerido"),
    }),
    doctor: Yup.object({
      unidad: Yup.string().when("usuario.rol", {
        is: "doctor",
        then: Yup.string().required("Campo requerido"),
      }),
      especialidad: Yup.string().when("usuario.rol", {
        is: "doctor",
        then: Yup.string().required("Campo requerido"),
      }),
      numeroMatricula: Yup.string().when("usuario.rol", {
        is: "doctor",
        then: Yup.string().required("Campo requerido"),
      }),
    }),
    personalAdmin: Yup.object({
      cargo: Yup.string().when("usuario.rol", {
        is: "personalAdmin",
        then: Yup.string().required("Campo requerido"),
      }),
    }),
    laboratorista: Yup.object({
      especialidad: Yup.string().when("usuario.rol", {
        is: "laboratorista",
        then: Yup.string().required("Campo requerido"),
      }),
      matriculaProf: Yup.string().when("usuario.rol", {
        is: "laboratorista",
        then: Yup.string().required("Campo requerido"),
      }),
    }),
  });

  //funciones
  const handleSubmit = (values, actions) => {
    if (editUser) {
      editar(values, actions);
    } else {
      agregar(values, actions);
    }
  };
  const agregar = async (values, actions) => {
    try {
      const { data } = await userService.guardar(values);
      setStep(step + 1);
      actions.resetForm();
      listar();
    } catch (error) {
      setShowError(true);
      console.error(error);
    }
  };
  const editar = async (values, actions) => {
    try {
      const { data } = await userService.modificar(idEdit, values);
      setStep(step + 1);
      actions.resetForm();
      listar();
    } catch (error) {
      setShowError(true);
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto px-6 mb-5 sm:px-10">
        <ul aria-label="Steps" className="flex items-center">
          {stepsLine.stpesCount.map((item, idx) => (
            <li
              aria-current={stepsLine.currentStep == idx + 1 ? "step" : false}
              className="flex-1 last:flex-none flex items-center"
              key={idx}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex-none flex items-center justify-center ${
                  stepsLine.currentStep > idx + 1
                    ? "bg-sky-300 border-sky-400"
                    : "" || stepsLine.currentStep == idx + 1
                    ? "border-sky-400"
                    : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full bg-sky-400 ${
                    stepsLine.currentStep != idx + 1 ? "hidden" : ""
                  }`}
                ></span>
                {stepsLine.currentStep > idx + 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <hr
                className={`w-full border ${
                  idx + 1 == stepsLine.stpesCount.length
                    ? "hidden"
                    : "" || stepsLine.currentStep > idx + 1
                    ? "border-sky-400"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <Formik
        initialValues={userValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          isValidating,
          isValid,
        }) => (
          <>
            <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
              {step === 1 && (
                <>
                  <label
                    htmlFor="usuario.email"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="usuario.email"
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.usuario?.email && touched.usuario?.email
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="usuario.email"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  {!editUser && (
                    <>
                      <label
                        htmlFor="usuario.password"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Password:
                      </label>
                      <div className="flex flex-row w-full ">
                        <Field
                          type="password"
                          name="usuario.password"
                          id="usuario.password"
                          className={`text-base text-zinc-900 p-2 flex-grow shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg ${
                            errors.usuario?.password &&
                            touched.usuario?.password
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <svg
                          className="ml-2 mt-2 w-6 h-7 cursor-pointer flex-none hover: text-gray-700"
                          onClick={() => {
                            if (!values.seepass) {
                              document
                                .getElementById("usuario.password")
                                .setAttribute("type", "text");
                              values.seepass = true;
                            } else {
                              document
                                .getElementById("usuario.password")
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
                      <ErrorMessage
                        name="usuario.password"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                    </>
                  )}

                  <label
                    htmlFor="usuario.rol"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Rol:
                  </label>
                  <Field
                    type="email"
                    name="usuario.rol"
                    className={
                      "p-2 text-base capitalize-first text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md "
                    }
                    disabled
                  />
                </>
              )}
              {step === 2 && (
                <div
                  style={{
                    height: "476px",
                    overflowY: "scroll",
                  }}
                  className="flex flex-col pr-2"
                >
                  <label
                    htmlFor="persona.nombre"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Nombres:
                  </label>
                  <Field
                    type="text"
                    name="persona.nombre"
                    style={{
                      textTransform: "capitalize",
                    }}
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.nombre && errors.persona?.nombre
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="persona.nombre"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label
                    htmlFor="persona.apellidoPaterno"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Apellido Paterno:
                  </label>
                  <Field
                    type="text"
                    name="persona.apellidoPaterno"
                    style={{
                      textTransform: "capitalize",
                    }}
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.apellidoPaterno &&
                      errors.persona?.apellidoPaterno
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="persona.apellidoPaterno"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label
                    htmlFor="persona.apellidoMaterno"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Apellido Materno:
                  </label>
                  <Field
                    type="text"
                    name="persona.apellidoMaterno"
                    style={{
                      textTransform: "capitalize",
                    }}
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.apellidoMaterno &&
                      errors.persona?.apellidoMaterno
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="persona.apellidoMaterno"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label
                    htmlFor="persona.ci"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    CI:
                  </label>
                  <Field
                    type="text"
                    name="persona.ci"
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.ci && errors.persona?.ci
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="persona.ci"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label
                    htmlFor="persona.telefono"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Teléfono:
                  </label>
                  <Field
                    type="text"
                    name="persona.telefono"
                    className={`p-2 esteInput text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.telefono && errors.persona?.telefono
                        ? "border-red-500"
                        : ""
                    } `}
                  />
                  <ErrorMessage
                    name="persona.telefono"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label
                    htmlFor="persona.direccion"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Dirección:
                  </label>
                  <Field
                    type="text"
                    name="persona.direccion"
                    style={{
                      textTransform: "capitalize",
                    }}
                    className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                      errors.persona?.direccion && errors.persona?.direccion
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="persona.direccion"
                    component="p"
                    className="text-center text-red-500 text-xs italic"
                  />
                  <label className="mb-1 text-base font-medium text-gray-700">
                    Foto:
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-8 pb-6">
                        <input id="dropzone-file" type="file" />
                        <svg
                          className="w-8 h-8 mb-0 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Haga clic para subir
                          </span>{" "}
                          o arrastre y suelte la imagen
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              {step === 3 && (
                <>
                  {values.usuario.rol === "doctor" && (
                    <>
                      <label
                        htmlFor="doctor.unidad"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Unidad:
                      </label>
                      <Field
                        type="text"
                        name="doctor.unidad"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.doctor?.unidad && errors.doctor?.unidad
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="doctor.unidad"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                      <label
                        htmlFor="doctor.especialidad"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Especialidad:
                      </label>
                      <Field
                        type="text"
                        name="doctor.especialidad"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.doctor?.especialidad &&
                          errors.doctor?.especialidad
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="doctor.especialidad"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                      <label
                        htmlFor="doctor.numeroMatricula"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Número de Matrícula:
                      </label>
                      <Field
                        type="text"
                        name="doctor.numeroMatricula"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.doctor?.numeroMatricula &&
                          errors.doctor?.numeroMatricula
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="doctor.numeroMatricula"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                    </>
                  )}
                  {values.usuario.rol === "personalAdmin" && (
                    <>
                      <label
                        htmlFor="personalAdmin.cargo"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Cargo:
                      </label>
                      <Field
                        type="text"
                        name="personalAdmin.cargo"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.personalAdmin?.cargo &&
                          errors.personalAdmin?.cargo
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="personalAdmin.cargo"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                    </>
                  )}
                  {values.usuario.rol === "laboratorista" && (
                    <>
                      <label
                        htmlFor="laboratorista.especialidad"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Especialidad:
                      </label>
                      <Field
                        type="text"
                        name="laboratorista.especialidad"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.laboratorista?.especialidad &&
                          errors.laboratorista?.especialidad
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="laboratorista.especialidad"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                      <label
                        htmlFor="laboratorista.matriculaProf"
                        className="mb-1 text-base font-medium text-gray-700"
                      >
                        Número de Matrícula Profesional:
                      </label>
                      <Field
                        type="text"
                        name="laboratorista.matriculaProf"
                        style={{
                          textTransform: "capitalize",
                        }}
                        className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-md ${
                          errors.laboratorista?.matriculaProf &&
                          errors.laboratorista?.matriculaProf
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="laboratorista.matriculaProf"
                        component="p"
                        className="text-center text-red-500 text-xs italic"
                      />
                    </>
                  )}
                </>
              )}

              {/* Botones de navegación */}
              {step === 1 && (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(step + 1);
                      setStepLine((prevState) => ({
                        ...prevState,
                        currentStep: 2,
                      }));
                    }}
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                      setStepLine((prevState) => ({
                        ...prevState,
                        currentStep: 1,
                      }));
                    }}
                    className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-md"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(step + 1);
                      setStepLine((prevState) => ({
                        ...prevState,
                        currentStep: 3,
                      }));
                    }}
                    className="ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-2 rounded-md"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 3 && (
                <>
                  <div className="mt-2 text-center text-red-500 text-xs italic">
                    {isValidating || !isValid
                      ? "Revisa si introduciste bien los campos"
                      : ""}
                  </div>
                  {showError && (
                    <div className="mt-2 text-center text-red-500 text-base ">
                      Error al registrar, cierra y vuelve a intentarlo
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(step - 1);
                        setStepLine((prevState) => ({
                          ...prevState,
                          currentStep: 2,
                        }));
                      }}
                      className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-md"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isValidating || !isValid}
                      className="ml-2  bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-md"
                    >
                      Guardar
                    </button>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <div className="container md:mt-1">
                    <div className="flex flex-col items-center">
                      <div className="wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-20"
                          viewBox="0 0 20 20"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="none"
                          />
                          <path
                            fill="#047857"
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 0 0 1.745-.723a3.066 3.066 0 0 1 3.976 0a3.066 3.066 0 0 0 1.745.723a3.066 3.066 0 0 1 2.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 0 1 0 3.976a3.066 3.066 0 0 0-.723 1.745a3.066 3.066 0 0 1-2.812 2.812a3.066 3.066 0 0 0-1.745.723a3.066 3.066 0 0 1-3.976 0a3.066 3.066 0 0 0-1.745-.723a3.066 3.066 0 0 1-2.812-2.812a3.066 3.066 0 0 0-.723-1.745a3.066 3.066 0 0 1 0-3.976a3.066 3.066 0 0 0 .723-1.745a3.066 3.066 0 0 1 2.812-2.812Zm7.44 5.252a1 1 0 0 0-1.414-1.414L9 10.586L7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      <div className="mt-3 text-xl font-semibold uppercase text-emerald-600">
                        {editUser ? "Actualizado!" : "Registrado!"}
                      </div>
                      <div className="text-base font-normal text-gray-500 text-center">
                        {values.usuario.rol === "doctor" && (
                          <>
                            {editUser
                              ? "El/La Doctor/Doctora fue actualizado/a correctamente."
                              : "El/La Doctor/Doctora fue agregado/a correctamente."}
                          </>
                        )}
                        {values.usuario.rol === "laboratorista" && (
                          <>
                            {editUser
                              ? "El/La Laboratorista fue actualizado/a correctamente."
                              : "El/La Laboratorista fue agregado/a correctamente."}
                          </>
                        )}
                        {values.usuario.rol === "personalAdmin" && (
                          <>
                            {editUser
                              ? "El Personal Administrativo fue actualizado/a correctamente."
                              : "El Personal Administrativo fue agregado/a correctamente."}
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        className="h-10 px-5 mt-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-emerald-700 hover:text-green-100"
                        onClick={() => setOpenModal(false)}
                        disabled={isValidating || !isValid}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
export default FormAdduser;
