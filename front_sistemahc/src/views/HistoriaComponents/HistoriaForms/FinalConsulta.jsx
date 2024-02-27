import React, { useEffect, useState } from "react";
import citaService from "./../../../services/citaService";
import historiaService from "./../../../services/historiaService";
import { Field, Form, Formik } from "formik";

const FinalConsulta = ({ consultaId }) => {
  const [finalConsulta, setFinalConsulta] = useState("load");
  const [agregar, setAgregar] = useState(false);

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
  const handlePost = async (values) => {
    try {
      const valoresNoVacios = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      console.log(valoresNoVacios);
      await historiaService.finalConsulta(consultaId, {
        cita: valoresNoVacios,
      });
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
                            htmlFor="motivo"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                          >
                            Resumen de los Hallazgos:
                          </label>

                          <Field
                            component="textarea"
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
                            htmlFor="motivo"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                          >
                            Impresión Diagnóstica:
                          </label>

                          <Field
                            component="textarea"
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
                              ? "Guardando datos..."
                              : "Guardar datos"}
                          </button>
                        </div>
                      </div>
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
