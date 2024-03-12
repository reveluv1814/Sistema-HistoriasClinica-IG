import React, { useEffect, useState } from "react";
import citaService from "./../../../services/citaService";
import historiaService from "./../../../services/historiaService";
import { Field, Form, Formik } from "formik";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

const FinalConsulta = ({ consultaId }) => {
  const navigate = useNavigate();
  const [finalConsulta, setFinalConsulta] = useState("load");
  const [agregar, setAgregar] = useState(false);
  const [finalConsultaModal, setFinalConsultaModal] = useState(false);

  const getFinalConsulta = async () => {
    const res = await citaService.verConsulta(consultaId);
    //console.log(res);
    setFinalConsulta({
      resumen: res.data.resumen,
      impresionDiag: res.data.impresionDiag,
    });
    setAgregar(res.data.resumen !== null && res.data.impresionDiag !== null);
  };
  useEffect(() => {
    getFinalConsulta();
  }, []);

  const closeFinalConsultaModal = () => {
    setFinalConsultaModal(false);
  };

  const handlePost = async (values) => {
    try {
      const valoresNoVacios = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      await historiaService.finalConsulta(consultaId, {
        cita: valoresNoVacios,
      });
      navigate("/doctor/pacientes");
      getFinalConsulta();
      setAgregar(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {finalConsulta === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-bold text-lg">
            Final de la Consulta
          </h4>
          <hr className="mb-3 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200 max-w-lg" />
          <div>
            <div className="flex flex-col justify-center items-center w-full px-6">
              <h4 className="font-inter font-extralight dark:text-white italic text-sm my-3">
                Recuerde, no se puede editar el final de la consulta ....
              </h4>
              <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-4 shadow-lg w-full ">
                <Formik
                  enableReinitialize
                  initialValues={{
                    resumen: finalConsulta.resumen ?? "",
                    impresionDiag: finalConsulta.impresionDiag ?? "",
                  }}
                  onSubmit={handlePost}
                >
                  {({
                    values,
                    handleSubmit,
                    isValidating,
                    isValid,
                    isSubmitting,
                  }) => (
                    <Form
                      onSubmit={handleSubmit}
                      className="flex flex-col px-7 "
                    >
                      <div className="">
                        <div className="flex flex-col justify-evenly mb-2 ">
                          <label
                            htmlFor="resumen"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                          >
                            Resumen de los Hallazgos:
                          </label>

                          <Field
                            component="textarea"
                            id="resumen"
                            name="resumen"
                            value={values?.resumen}
                            placeholder={"Ingrese el resumen de la consulta..."}
                            rows={3}
                            className="p-2 text-base max-xl:text-sm text-zinc-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                            disabled={agregar}
                          />
                        </div>
                        <div className="flex flex-col justify-evenly mb-2 ">
                          <label
                            htmlFor="impresionDiag"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                          >
                            Impresión Diagnóstica:
                          </label>

                          <Field
                            component="textarea"
                            id="impresionDiag"
                            name="impresionDiag"
                            value={values?.impresionDiag}
                            placeholder={
                              "Ingrese la impresión diagnóstica de la consulta..."
                            }
                            rows={3}
                            className="p-2 text-base max-xl:text-sm text-zinc-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                            disabled={agregar}
                          />
                        </div>
                        <div className="flex justify-center mt-4">
                          <button
                            type="button"
                            onClick={() => setFinalConsultaModal(true)}
                            className={`text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md ${
                              agregar
                                ? "bg-gray-400/40 dark:bg-gray-500/70"
                                : "bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                            }`}
                          >
                            {isSubmitting
                              ? "Guardando datos..."
                              : "Guardar datos"}
                          </button>
                        </div>
                      </div>
                      <Modal
                        modalOpen={finalConsultaModal}
                        setOpenModal={closeFinalConsultaModal}
                        title={"Final de la Consulta"}
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
                              Desea Finalizar la consulta?
                            </h4>
                            <div className="w-full flex flex-row space-x-2 mt-3">
                              <button
                                type="button"
                                onClick={() => setFinalConsultaModal(false)}
                                className="text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md bg-rose-500 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                disabled={
                                  isSubmitting ||
                                  isValidating ||
                                  !isValid ||
                                  agregar
                                }
                                className={`text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md ${
                                  agregar
                                    ? "bg-gray-400/40 dark:bg-gray-500/70"
                                    : "bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                                }`}
                              >
                                {isSubmitting
                                  ? "Finalizando..."
                                  : "Finalizar consulta"}
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
      )}
    </>
  );
};

export default FinalConsulta;
