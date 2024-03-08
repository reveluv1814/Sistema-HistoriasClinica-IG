import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../layouts/css/additional-styles/sistema.css";

const FormAddPaciente = ({
  setOpenModal,
  pacienteValue,
  pacienteService,
  listar,
  editPaciente,
  idEdit,
}) => {
  const [step, setStep] = useState(1);
  const [showError, setShowError] = useState(false);

  const [stepsLine, setStepLine] = useState({
    stpesCount: [1, 2],
    currentStep: 1,
  });
  //yup
  const validationSchema = Yup.object({
    persona: Yup.object({
      nombre: Yup.string().required("Campo requerido"),
      apellidoMaterno: Yup.string().required("Campo requerido"),
      apellidoPaterno: Yup.string().required("Campo requerido"),
      ci: Yup.string()
        .required("Campo requerido")
        .min(5, "Debe tener al menos 5 caracteres"),
      telefono: Yup.string()
        .required("Campo requerido")
        .min(6, "Debe tener al menos 6 caracteres")
        .matches(/^\d+$/, "Debe contener solo números"),
      direccion: Yup.string().required("Campo requerido"),
    }),
    paciente: Yup.object({
      fechanac: Yup.date()
        .nullable()
        .required("Fecha de nacimiento es requerida"),
      sexo: Yup.string().required("Sexo es requerido"),
      raza: Yup.string().required("Raza es requerida"),
      procedencia: Yup.string().required("Procedencia es requerida"),
      residencia: Yup.string().required("Residencia es requerida"),
    }),
  });
  //funciones
  const handleSubmit = (values, actions) => {
    editPaciente ? editar(values, actions) : agregar(values, actions);
  };
  const agregar = async (values, actions) => {
    try {
      await pacienteService.guardar(values);
      setStep(step + 1);
    } catch (error) {
      setShowError(true);
      console.error(error);
    } finally {
      actions.resetForm();
      listar();
    }
  };
  const editar = async (values, actions) => {
    try {
      await pacienteService.modificar(idEdit, values);
      setStep(step + 1);
    } catch (error) {
      setShowError(true);
      console.error(error);
    } finally {
      actions.resetForm();
      listar();
    }
  };
  const handleNext = () => {
    if (step < stepsLine.stpesCount.length) {
      setStep(step + 1);
      setStepLine((prevState) => ({
        ...prevState,
        currentStep: step + 1,
      }));
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setStepLine((prevState) => ({
        ...prevState,
        currentStep: step - 1,
      }));
    }
  };
  return (
    <div>
      <div className="max-w-lg mx-auto px-6 mb-5 sm:px-10">
        <ul aria-label="Steps" className="flex items-center">
          {stepsLine.stpesCount.map((item, idx) => (
            <li
              aria-current={stepsLine.currentStep == idx + 1 ? "step" : false}
              className="flex-1 last:flex-none flex items-center"
              key={idx}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex-none flex items-center justify-center dark:border-indigo-500 ${
                  stepsLine.currentStep > idx + 1
                    ? "bg-sky-300 border-sky-400 dark:bg-indigo-400 dark:border-indigo-500"
                    : "" || stepsLine.currentStep == idx + 1
                    ? "border-sky-400 dark:border-indigo-500"
                    : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full bg-sky-400 dark:bg-indigo-400 ${
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
                    className="w-5 h-5 text-white dark:text-indigo-900"
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
                className={`w-full border dark:border-indigo-400 ${
                  idx + 1 == stepsLine.stpesCount.length
                    ? "hidden"
                    : "" || stepsLine.currentStep > idx + 1
                    ? "border-sky-400 dark:border-indigo-500"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <Formik
        initialValues={pacienteValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleSubmit, touched, isValidating, isValid }) => (
          <>
            <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
              {step === 1 && (
                <div
                  style={{
                    height: "",
                    overflowY: "scroll",
                  }}
                  className="flex flex-col pr-2 pl-2 h-[476px] xl:h-[300px]"
                >
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.nombre"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Nombres:
                    </label>
                    <Field
                      type="text"
                      id="persona.nombre"
                      name="persona.nombre"
                      placeholder="Ingrese los nombres del paciente..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.nombre && errors.persona?.nombre
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="persona.nombre"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.apellidoPaterno"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Apellido Paterno:
                    </label>
                    <Field
                      type="text"
                      id="persona.apellidoPaterno"
                      name="persona.apellidoPaterno"
                      placeholder="Ingrese el apellido paterno..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.apellidoPaterno &&
                        errors.persona?.apellidoPaterno
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="persona.apellidoPaterno"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.apellidoMaterno"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Apellido Materno:
                    </label>
                    <Field
                      type="text"
                      id="persona.apellidoMaterno"
                      name="persona.apellidoMaterno"
                      placeholder="Ingrese el apellido materno..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.apellidoMaterno &&
                        errors.persona?.apellidoMaterno
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="persona.apellidoMaterno"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.ci"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      CI:
                    </label>
                    <Field
                      type="text"
                      id="persona.ci"
                      name="persona.ci"
                      placeholder="Ingrese solo el numero de ci..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.ci && errors.persona?.ci
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="persona.ci"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.telefono"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Celular/Teléfono:
                    </label>
                    <Field
                      type="text"
                      id="persona.telefono"
                      name="persona.telefono"
                      placeholder="Ingrese el numero de tel/cel..."
                      className={`p-2 esteInput text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.telefono && errors.persona?.telefono
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      } `}
                    />
                    <ErrorMessage
                      name="persona.telefono"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="persona.direccion"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Dirección:
                    </label>
                    <Field
                      type="text"
                      id="persona.direccion"
                      name="persona.direccion"
                      placeholder="Ingrese la dirección..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.persona?.direccion && errors.persona?.direccion
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="persona.direccion"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  {/*foto */}
                  <label className="mb-1 text-base font-medium text-gray-700 dark:text-gray-300">
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
              {step === 2 && (
                <div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="paciente.fechanac"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Fecha de nacimiento:
                    </label>
                    <Field
                      type="date"
                      name="paciente.fechanac"
                      id="paciente.fechanac"
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 dark:border-gray-700 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 ${
                        errors.paciente?.fechanac && touched.paciente?.fechanac
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="paciente.fechanac"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="paciente.sexo"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Sexo:
                    </label>
                    <Field
                      as="select"
                      id="paciente.sexo"
                      name="paciente.sexo"
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 ${
                        errors.paciente?.sexo && touched.paciente?.sexo
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    >
                      <option disabled value="">
                        Seleccione una opción
                      </option>
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                    </Field>
                    <ErrorMessage
                      name="paciente.sexo"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="paciente.raza"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Raza:
                    </label>
                    <Field
                      type="text"
                      id="paciente.raza"
                      name="paciente.raza"
                      placeholder="Ingrese la raza..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 ${
                        errors.paciente?.raza && touched.paciente?.raza
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="paciente.raza"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="paciente.procedencia"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Procedencia:
                    </label>
                    <Field
                      type="text"
                      id="paciente.procedencia"
                      name="paciente.procedencia"
                      placeholder="Ingrese la procedencia..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 ${
                        errors.paciente?.procedencia &&
                        touched.paciente?.procedencia
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="paciente.procedencia"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="paciente.residencia"
                      className="mb-1 text-base font-medium text-gray-800 dark:text-gray-300"
                    >
                      Residencia:
                    </label>
                    <Field
                      type="text"
                      id="paciente.residencia"
                      name="paciente.residencia"
                      placeholder="Ingrese la residencia..."
                      className={`p-2 text-base text-zinc-900 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 ${
                        errors.paciente?.residencia &&
                        touched.paciente?.residencia
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="paciente.residencia"
                      component="p"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                </div>
              )}
              {/* Botones de navegación */}
              {step === 1 && (
                <div className="mt-4 flex items-center justify-center px-2">
                  <button
                    type="button"
                    onClick={() => handleNext()}
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md w-full"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="mt-2 text-center text-red-500 text-xs italic dark:text-red-200">
                    {isValidating || !isValid
                      ? "Revisa si introduciste bien los campos"
                      : ""}
                  </div>
                  {showError && (
                    <div className="mt-2 text-center text-red-500 text-base ">
                      Error al registrar, cierra y vuelve a intentarlo
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between w-full">
                    <button
                      type="button"
                      onClick={() => handleBack()}
                      className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-md w-[49%]"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isValidating || !isValid}
                      className="ml-2  bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-md w-[49%]"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="container md:mt-1">
                  <div className="flex flex-col items-center">
                    <div className="wrapper ">
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

                    <div className="mt-3 text-xl font-semibold uppercase text-emerald-600 dark:text-emerald-500">
                      {editPaciente ? "Actualizado!" : "Registrado!"}
                    </div>
                    <div className="text-base font-normal text-gray-500 text-center dark:text-gray-300">
                      {editPaciente
                        ? "El/La Paciente fue actualizado correctamente."
                        : "El/La Paciente fue agregado correctamente."}
                    </div>

                    <button
                      type="button"
                      className="h-10 px-5 mt-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-emerald-700 hover:text-green-100 dark:text-green-500 dark:hover:text-green-200"
                      onClick={() => setOpenModal(false)}
                      disabled={isValidating || !isValid}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormAddPaciente;
