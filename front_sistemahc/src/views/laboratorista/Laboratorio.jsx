import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import laboratoristaService from "./../../services/laboratoristaService";
import Modal from "../../components/Modal";

const Laboratorio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laboModal, setLaboModal] = useState(false);
  //yup
  const validationSchema = Yup.object().shape({
    examen: Yup.string().required("El examen es requerido"),
  });

  const handlePost = async (values, actions) => {
    try {
      const idUserRol = localStorage.getItem("id");
      values.laboratoristaId = idUserRol;
      await laboratoristaService.guardarHistoriaLabo(id, {
        historiaLabo: values,
      });
      actions.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/laboratorista/pacientes");
    }
  };
  const closeLaboModal = () => {
    setLaboModal(false);
  };
  return (
    <div>
      <a
        onClick={() => navigate("/laboratorista/pacientes")}
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
      <div className="border rounded-md mt-3 p-6 shadow-md flex bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
        <div className="flex flex-col w-full">
          <h2 className="text-base lg:text-3xl font-semibold mb-1 dark:text-gray-300">
            Agregar Examen
          </h2>
          <hr
            className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800"
            style={{ width: "100%" }}
          />
          <div className="py-8 shadow bg-blue-200/70 dark:bg-sky-700/90 rounded-md flex justify-center">
            <div className="bg-zinc-100 dark:bg-sky-900 rounded-lg p-4 shadow-lg w-3/4 ">
              <Formik
                validationSchema={validationSchema}
                initialValues={{ examen: "", laboratoristaId: null }}
                onSubmit={handlePost}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  isValidating,
                  isValid,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
                    <div className="flex flex-col">
                      <label
                        htmlFor="examen"
                        className="pt-2 mb-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Examen(s) realizados al paciente:
                      </label>

                      <Field
                        component="textarea"
                        id="examen"
                        name="examen"
                        value={values?.examen}
                        placeholder={
                          "Ingrese el examen realizado al paciente..."
                        }
                        rows={3}
                        className={`p-2 text-base max-xl:text-sm text-zinc-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600  ${
                          errors?.examen && touched?.examen
                            ? "border-red-500 dark:border-red-300"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="examen"
                        component="p"
                        className="text-center text-red-500 text-xs italic dark:text-red-200"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-emerald-600 py-2 px-4 rounded-lg mt-3 text-gray-200 hover:bg-emerald-700 hover:text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                      disabled={isSubmitting || isValidating || !isValid}
                      onClick={() => setLaboModal(true)}
                    >
                      {isSubmitting ? "Registrando" : "Registrar"}
                    </button>

                    <Modal
                      modalOpen={laboModal}
                      setOpenModal={closeLaboModal}
                      title={"Registrar examen laboratorio"}
                      contenido={"shadow shadow-amber-500/40"}
                    >
                      <div className=" py-4 shadow-lg">
                        <div className="flex items-center justify-center flex-col">
                          <div className="text-amber-700 dark:text-amber-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-16 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                              />
                            </svg>
                          </div>
                          <h4 className="text-center text-gray-700 text-lg font-bold dark:text-gray-300">
                            Desea registrar el examen laboratorio?
                          </h4>
                          <div className="w-full flex flex-row space-x-2 mt-3">
                            <button
                              type="button"
                              onClick={() => setLaboModal(false)}
                              className="text-white text-sm shadow-lg font-bold py-2 px-4 w-full rounded-md bg-rose-500 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="bg-emerald-600 py-2 px-4 w-full text-sm rounded-lg font-bold text-gray-200 hover:bg-emerald-700 hover:text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                              disabled={
                                isSubmitting || isValidating || !isValid
                              }
                            >
                              {isSubmitting ? "Registrando" : "Registrar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laboratorio;
