import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import { Field, Form, Formik } from "formik";

const NarizForm = ({ expFisicaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const exploracionFFetch =
        await exploracionFisicaService.apartadosExploracionF(expFisicaId);
      setDatos(exploracionFFetch.data.nariz);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApartado();
  }, []);
  /*funciones para los botones de crear y editar */
  const handleEditar = () => {
    setEditando(!editando);
  };
  const handleAgregar = () => {
    setAgregar(!agregar);
  };
  /*funciones para hacer el fecth post y patch*/
  const handlePost = async (values) => {
    try {
      const valoresNoVacios = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      await exploracionFisicaService.guardarNariz(expFisicaId, {
        nariz: valoresNoVacios,
      });
      getApartado();
    } catch (error) {
      console.log(error);
    } finally {
      setAgregar(false);
    }
  };
  const handlePatch = async (values) => {
    try {
      const valoresNoVacios = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      await exploracionFisicaService.editarNariz(datos.id, {
        nariz: valoresNoVacios,
      });
      getApartado();
    } catch (error) {
      console.log(error);
    } finally {
      setEditando(false);
    }
  };
  //formulario
  const Formm = ({ isCreate, handleFun }) => {
    //valores iniciales
    const initialValues = {
      puentenasal: datos ? datos.puentenasal ?? "" : "",
      stenosis: datos ? datos.stenosis ?? "" : "",
      tabique: datos ? datos.tabique ?? "" : "",
      hipoplasis: datos ? datos.hipoplasis ?? "" : "",
      narizProminente: datos ? datos.narizProminente ?? "" : "",
      tipoNariz: datos ? datos.tipoNariz ?? "" : "",
      obs: datos ? datos.obs ?? "" : "",
    };

    return (
      <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-3 shadow-lg w-11/12 mb-4">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleFun}
        >
          {({ values, handleSubmit, isValidating, isValid, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col px-4">
              <div className="">
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="puentenasal"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Puente nasal bajo:
                    </label>
                    <Field
                      type="checkbox"
                      name="puentenasal"
                      value={values?.puentenasal}
                      checked={values?.puentenasal ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stenosis"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Estenosis de coanas:
                    </label>
                    <Field
                      as="select"
                      name="stenosis"
                      className="px-1 py-0 text-sm max-xl:text-xs cursor-pointer text-zinc-700 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                      value={values?.stenosis ?? ""}
                    >
                      <option value="" disabled hidden>
                        Selecciona
                      </option>
                      <option value={"Anterior"}>Anterior</option>
                      <option value={"Posterior"}>Posterior</option>
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="tabique"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Desviación del Tabique:
                    </label>
                    <Field
                      type="checkbox"
                      name="tabique"
                      value={values?.tabique}
                      checked={values?.tabique ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="hipoplasis"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Hipoplasis alar:
                    </label>
                    <Field
                      type="checkbox"
                      name="hipoplasis"
                      value={values?.hipoplasis}
                      checked={values?.hipoplasis ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="narizProminente"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Nariz prominente:
                    </label>
                    <Field
                      type="checkbox"
                      name="narizProminente"
                      value={values?.narizProminente}
                      checked={values?.narizProminente ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="tipoNariz"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Tipo de nariz:
                  </label>
                  <Field
                    component="textarea"
                    name="tipoNariz"
                    value={values?.tipoNariz}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="obs"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Obs:
                  </label>
                  <Field
                    component="textarea"
                    name="obs"
                    value={values?.obs}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      isValidating ||
                      !isValid ||
                      (!isCreate && !editando)
                    }
                    className={`text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md ${
                      !isCreate && !editando
                        ? "bg-gray-400/40 dark:bg-gray-500/70"
                        : "bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                    }`}
                  >
                    {isSubmitting ? "Guardando datos..." : "Guardar datos"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  return (
    <>
      {datos === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-blue-300 dark:bg-sky-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h3 className="text-lg font-semibold mb-1 ml-8 dark:text-zinc-100">
            5. Nariz
          </h3>
          <hr className="mb-2 border-0 h-px  bg-sky-700 ml-8 mr-8 shadow  dark:bg-gray-300/60" />
          {datos ? (
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-start w-full ml-[60px]">
                <button
                  type="button"
                  onClick={handleEditar}
                  className={`mt-4 py-2 px-6 text-white font-semibold ${
                    editando
                      ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-800"
                      : "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                  }  rounded-lg shadow-md `}
                >
                  {editando ? "Cancelar" : "Editar"}
                </button>
              </div>

              <div className="pl-8 mt-4 w-full">
                <h2 className="text-sm text-left mb-2 font-inter font-semibold text-sky-700 dark:text-white">
                  Editar Apartado:
                </h2>
              </div>
              <Formm isCreate={false} handleFun={handlePatch} />
            </div>
          ) : (
            <div>
              <div className="pl-4">
                <button
                  onClick={handleAgregar}
                  className={` ${
                    agregar
                      ? "ml-[21px] bg-rose-500 hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-800"
                      : "bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500/70"
                  } text-white rounded-md shadow-md p-2 font-semibold`}
                >
                  {agregar ? "Cancelar" : "Agregar Apartado"}
                </button>
              </div>
              {agregar && (
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="pl-[38px] mt-4 w-full">
                    <h2 className="text-sm text-left mb-2 font-inter font-semibold text-sky-700 dark:text-white">
                      Agregar Apartado:
                    </h2>
                  </div>
                  <Formm isCreate={true} handleFun={handlePost} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NarizForm;
