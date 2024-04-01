import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import citaService from "./../../services/citaService";
import Modal from "../../components/Modal";

const AddCita = () => {
  //consigue el id de params
  const { id } = useParams();

  const citaValue = {
    cita: {
      fecha: "",
      hora: "",
      pacienteId: null,
      doctorId: 0,
      personalAdId: null,
      estado: true,
    },
  };
  //lista los doctores
  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const { data } = await citaService.doctores();
        setOptionsDoc(data.doctores);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctores();
  }, []);
  const navigate = useNavigate();
  const [optionsDoc, setOptionsDoc] = useState({ rows: [] });
  const [modalAddCita, setModalAddCita] = useState(false);
  const [errorMes, setErrorMes] = useState(false);
  //yup
  const validationSchema = Yup.object().shape({
    cita: Yup.object().shape({
      fecha: Yup.date().required("La fecha es requerida"),
      hora: Yup.string().required("La hora es requerida"),
      doctorId: Yup.number()
        .required("El Doctor es requerido")
        .positive("El ID debe ser un número positivo"),
    }),
  });

  //funciones
  const switchAddCita = () => {
    setModalAddCita(false);
    navigate("/personal/pacientes");
  };
  const handleSubmit = async (values, actions) => {
    try {
      const idUserRol = localStorage.getItem("id");
      const idDocInt = parseInt(values.cita.doctorId);
      values.cita.pacienteId = id;
      values.cita.doctorId = idDocInt;
      values.cita.personalAdId = idUserRol;
      await citaService.guardar(values);
      setModalAddCita(true);
      actions.resetForm();
    } catch (error) {
      setErrorMes(true);
      console.error(error);
    }
  };

  return (
    <>
      <a
        onClick={() => navigate("/personal/pacientes")}
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-indigo-600 rounded-lg shadow-md group cursor-pointer bg-indigo-500 dark:bg-indigo-800 dark:border-indigo-900"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-400 dark:bg-indigo-700 group-hover:translate-x-0 ease">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          Atrás
        </span>
        <span className="relative invisible">Atrás</span>
      </a>
      <Formik
        initialValues={citaValue}
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
          isSubmitting,
        }) => (
          <>
            <div className="bg-indigo-300 dark:bg-slate-700 flex justify-center rounded-xl p-5 mt-4">
              <div className="bg-gray-100 dark:bg-slate-800 xl:w-2/3 md:w-2/4 p-5 flex items-center justify-center flex-wrap rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <Form onSubmit={handleSubmit}>
                  <h3 className="text-center font-inter text-gray-700 dark:text-white font-bold text-2xl mb-5">
                    Crear una Cita
                  </h3>
                  <div className=" flex flex-row items-center mb-4">
                    <label
                      htmlFor="cita.fecha"
                      className="font-medium text-lg text-gray-700 dark:text-gray-300 mr-2"
                    >
                      Fecha:
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="date"
                        id="cita.fecha"
                        name="cita.fecha"
                        className={`p-1 text-base mr-2 text-zinc-800 cursor-pointer shadow appearance-none border border-blue-500 bg-blue-300 rounded-lg max-w-md dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 ${
                          errors.cita?.fecha && touched.cita?.fecha
                            ? "border-red-500 dark:border-red-300"
                            : ""
                        }`}
                        value={values.cita?.fecha}
                      />
                      <ErrorMessage
                        name="cita.fecha"
                        component="p"
                        className="text-center text-red-500 text-xs italic dark:text-red-200"
                      />
                    </div>
                    <label
                      htmlFor="cita.hora"
                      className="mr-2 ml-2 font-medium text-lg text-gray-700 dark:text-gray-300"
                    >
                      Hora:
                    </label>{" "}
                    <div className="flex flex-col">
                      <Field
                        type="time"
                        id="cita.hora"
                        name="cita.hora"
                        className={`p-1 text-base text-zinc-800 cursor-pointer shadow appearance-none border border-blue-500 bg-blue-300 rounded-lg max-w-md dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 ${
                          errors.cita?.hora && touched.cita?.hora
                            ? "border-red-500 dark:border-red-300"
                            : ""
                        }`}
                        value={values.cita?.hora}
                      />
                      <ErrorMessage
                        name="cita.hora"
                        component="p"
                        className="text-center text-red-500 text-xs italic dark:text-red-200"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor="cita.doctorId"
                      className="font-medium text-lg text-gray-700 dark:text-gray-300"
                    >
                      Selecciona una opción:
                    </label>
                    <Field
                      as="select"
                      id="cita.doctorId"
                      name="cita.doctorId"
                      className={`p-1 pl-2 text-base cursor-pointer text-zinc-900 shadow appearance-none border border-gray-300 bg-blue-300 rounded-lg max-w-xl dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 ${
                        errors.cita?.doctorId
                          ? "border-red-500 dark:border-red-300"
                          : ""
                      }`}
                    >
                      <option value="">Seleccione una opción</option>
                      {optionsDoc.rows.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.persona.nombreCompleto}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="cita.doctorId"
                      component="div"
                      className="text-center text-red-500 text-xs italic dark:text-red-200"
                    />
                  </div>
                  <div className=" flex items-center justify-center flex-col">
                    {errorMes && (
                      <div className="mb-2 text-center text-red-500 text-base ">
                        Error al registrar, ve atrás y vuelve a intentarlo
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-emerald-500 py-2 px-4 rounded-lg text-gray-200 hover:bg-emerald-600 hover:text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                      disabled={isSubmitting || isValidating || !isValid}
                    >
                      {isSubmitting ? "Registrando" : "Registrar"}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </>
        )}
      </Formik>
      <Modal
        modalOpen={modalAddCita}
        setOpenModal={switchAddCita}
        title={"Cita agregada"}
        contenido={" shadow shadow-emerald-500/40"}
      >
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
              {"Registrado!"}
            </div>
            <div className="text-base font-normal text-gray-500 text-center dark:text-gray-300">
              {"La Cita fue registrada correctamente."}
            </div>

            <button
              type="button"
              className="h-10 px-5 mt-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-emerald-700 hover:text-green-100 dark:text-green-500 dark:hover:text-green-200"
              onClick={() => switchAddCita(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCita;
