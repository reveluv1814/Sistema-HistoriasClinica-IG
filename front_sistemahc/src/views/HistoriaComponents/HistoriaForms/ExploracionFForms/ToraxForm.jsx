import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import { Field, Form, Formik } from "formik";

const ToraxForm = ({ expFisicaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const exploracionFFetch =
        await exploracionFisicaService.apartadosExploracionF(expFisicaId);
      setDatos(exploracionFFetch.data.torax);
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
      await exploracionFisicaService.guardarTorax(expFisicaId, {
        torax: valoresNoVacios,
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
      await exploracionFisicaService.editarTorax(datos.id, {
        torax: valoresNoVacios,
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
      cajaPequeña: datos ? datos.cajaPequeña ?? "" : "",
      esternonCorto: datos ? datos.esternonCorto ?? "" : "",
      escavado: datos ? datos.escavado ?? "" : "",
      quilla: datos ? datos.quilla ?? "" : "",
      mamasAnormales: datos ? datos.mamasAnormales ?? "" : "",
      politelia: datos ? datos.politelia ?? "" : "",
      defectosCostales: datos ? datos.defectosCostales ?? "" : "",
      obs: datos ? datos.obs ?? "" : "",
      pulmones: datos ? datos.pulmones ?? "" : "",
      cardioTa: datos ? datos.cardioTa ?? "" : "",
      cardioTaSobre: datos ? datos.cardioTaSobre ?? "" : "",
      cardioFc: datos ? datos.cardioFc ?? "" : "",
      cardioBM: datos ? datos.cardioBM ?? "" : "",
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
                      htmlFor="cajaPequeña"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Caja toraxica pequeña:
                    </label>
                    <Field
                      type="checkbox"
                      name="cajaPequeña"
                      value={values?.cajaPequeña}
                      checked={values?.cajaPequeña ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="esternonCorto"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Esternon corto:
                    </label>
                    <Field
                      type="checkbox"
                      name="esternonCorto"
                      value={values?.esternonCorto}
                      checked={values?.esternonCorto ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="escavado"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Escavado:
                    </label>
                    <Field
                      type="checkbox"
                      name="escavado"
                      value={values?.escavado}
                      checked={values?.escavado ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quilla"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      En Quilla:
                    </label>
                    <Field
                      type="checkbox"
                      name="quilla"
                      value={values?.quilla}
                      checked={values?.quilla ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="mamasAnormales"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Mamas-anormales:
                    </label>
                    <Field
                      type="checkbox"
                      name="mamasAnormales"
                      value={values?.mamasAnormales}
                      checked={values?.mamasAnormales ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="politelia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Politelia:
                    </label>
                    <Field
                      type="checkbox"
                      name="politelia"
                      value={values?.politelia}
                      checked={values?.politelia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="defectosCostales"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Defectos-costales:
                    </label>
                    <Field
                      type="checkbox"
                      name="defectosCostales"
                      value={values?.defectosCostales}
                      checked={values?.defectosCostales ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
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
                <div className="w-full">
                  <label
                    htmlFor="pulmones"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Pulmones:
                  </label>
                  <Field
                    component="textarea"
                    name="pulmones"
                    value={values?.pulmones}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="cardioTa"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Cardio - Circulatorio: TA
                    </label>
                    <Field
                      type="number"
                      name="cardioTa"
                      placeholder="0.0"
                      value={values?.cardioTa}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />

                    <label
                      htmlFor="cardioTaSobre"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      /
                    </label>
                    <Field
                      type="number"
                      name="cardioTaSobre"
                      placeholder="0.0"
                      value={values?.cardioTaSobre}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="cardioFc"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      FC:
                    </label>
                    <Field
                      type="number"
                      name="cardioFc"
                      placeholder="0.0"
                      value={values?.cardioFc}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="cardioBM"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      .b.m.:
                    </label>
                    <Field
                      component="textarea"
                      name="cardioBM"
                      value={values?.cardioBM}
                      placeholder="..."
                      rows={1}
                      className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
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
        <div className="bg-indigo-300 dark:bg-sky-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h3 className="text-lg font-semibold mb-1 ml-8 dark:text-zinc-100">
            9. Tórax
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

export default ToraxForm;
