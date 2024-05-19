import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import { Field, Form, Formik } from "formik";

const OjosForm = ({ expFisicaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const exploracionFFetch =
        await exploracionFisicaService.apartadosExploracionF(expFisicaId);
      setDatos(exploracionFFetch.data.ojos);
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
      await exploracionFisicaService.guardarOjos(expFisicaId, {
        ojos: valoresNoVacios,
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
      await exploracionFisicaService.editarOjos(datos.id, {
        ojos: valoresNoVacios,
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
      sinofiris: datos ? datos.sinofiris ?? "" : "",
      ptosis_p: datos ? datos.ptosis_p ?? "" : "",
      estrabismo: datos ? datos.estrabismo ?? "" : "",
      convergente: datos ? datos.convergente ?? "" : "",
      divergente: datos ? datos.divergente ?? "" : "",
      infeccion: datos ? datos.infeccion ?? "" : "",
      epifora: datos ? datos.epifora ?? "" : "",
      anoftalmina: datos ? datos.anoftalmina ?? "" : "",
      microftalmina: datos ? datos.microftalmina ?? "" : "",
      hipertelorismo: datos ? datos.hipertelorismo ?? "" : "",
      epicanto: datos ? datos.epicanto ?? "" : "",
      angulo_oblicuos: datos ? datos.angulo_oblicuos ?? "" : "",
      exoftalmina: datos ? datos.exoftalmina ?? "" : "",
      nistagmus: datos ? datos.nistagmus ?? "" : "",
      escleras_azul: datos ? datos.escleras_azul ?? "" : "",
      coloboma: datos ? datos.coloboma ?? "" : "",
      aniridia: datos ? datos.aniridia ?? "" : "",
      maculas_iris: datos ? datos.maculas_iris ?? "" : "",
      catarata: datos ? datos.catarata ?? "" : "",
      leucoma: datos ? datos.leucoma ?? "" : "",
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
                      htmlFor="sinofiris"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Sinofiris:
                    </label>
                    <Field
                      type="checkbox"
                      id="sinofiris"
                      name="sinofiris"
                      value={values?.sinofiris}
                      checked={values?.sinofiris ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ptosis_p"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Ptosis parpebral:
                    </label>
                    <Field
                      type="checkbox"
                      id="ptosis_p"
                      name="ptosis_p"
                      value={values?.ptosis_p}
                      checked={values?.ptosis_p ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="estrabismo"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Estrabismo:
                    </label>
                    <Field
                      type="checkbox"
                      id="estrabismo"
                      name="estrabismo"
                      value={values?.estrabismo}
                      checked={values?.estrabismo ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="convergente"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Convergente:
                    </label>
                    <Field
                      type="checkbox"
                      name="convergente"
                      id="convergente"
                      value={values?.convergente}
                      checked={values?.convergente ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="divergente"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Divergente:
                    </label>
                    <Field
                      type="checkbox"
                      id="divergente"
                      name="divergente"
                      value={values?.divergente}
                      checked={values?.divergente ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="infeccion"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Infección:
                    </label>
                    <Field
                      type="checkbox"
                      name="infeccion"
                      id="infeccion"
                      value={values?.infeccion}
                      checked={values?.infeccion ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="epifora"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Epífora:
                    </label>
                    <Field
                      type="checkbox"
                      id="epifora"
                      name="epifora"
                      value={values?.epifora}
                      checked={values?.epifora ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="anoftalmina"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Anoftalmina:
                    </label>
                    <Field
                      type="checkbox"
                      id="anoftalmina"
                      name="anoftalmina"
                      value={values?.anoftalmina}
                      checked={values?.anoftalmina ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="microftalmina"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Microftalmia:
                    </label>
                    <Field
                      type="checkbox"
                      id="microftalmina"
                      name="microftalmina"
                      value={values?.microftalmina}
                      checked={values?.microftalmina ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hipertelorismo"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Hipertelorismo:
                    </label>
                    <Field
                      type="checkbox"
                      id="hipertelorismo"
                      name="hipertelorismo"
                      value={values?.hipertelorismo}
                      checked={values?.hipertelorismo ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="epicanto"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Epicanto:
                    </label>
                    <Field
                      type="checkbox"
                      name="epicanto"
                      id="epicanto"
                      value={values?.epicanto}
                      checked={values?.epicanto ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="angulo_oblicuos"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Ángulos parpebrales oblicuos:
                    </label>
                    <Field
                      as="select"
                      id="angulo_oblicuos"
                      name="angulo_oblicuos"
                      className="px-1 py-0 text-sm max-xl:text-xs cursor-pointer text-zinc-700 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                      value={values?.angulo_oblicuos ?? ""}
                    >
                      <option value="" disabled hidden>
                        Selecciona
                      </option>
                      <option value={"Para arriba"}>Para arriba</option>
                      <option value={"Para abajo"}>Para abajo</option>
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="exoftalmina"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Exoftalmia:
                    </label>
                    <Field
                      type="checkbox"
                      id="exoftalmina"
                      name="exoftalmina"
                      value={values?.exoftalmina}
                      checked={values?.exoftalmina ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nistagmus"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Nistagmus:
                    </label>
                    <Field
                      type="checkbox"
                      id="nistagmus"
                      name="nistagmus"
                      value={values?.nistagmus}
                      checked={values?.nistagmus ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="escleras_azul"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Escleras azules:
                    </label>
                    <Field
                      type="checkbox"
                      id="escleras_azul"
                      name="escleras_azul"
                      value={values?.escleras_azul}
                      checked={values?.escleras_azul ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="coloboma"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Coloboma:
                    </label>
                    <Field
                      type="checkbox"
                      id="coloboma"
                      name="coloboma"
                      value={values?.coloboma}
                      checked={values?.coloboma ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="aniridia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Aniridia:
                    </label>
                    <Field
                      type="checkbox"
                      id="aniridia"
                      name="aniridia"
                      value={values?.aniridia}
                      checked={values?.aniridia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="maculas_iris"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Máculas en iris:
                    </label>
                    <Field
                      type="checkbox"
                      id="maculas_iris"
                      name="maculas_iris"
                      value={values?.maculas_iris}
                      checked={values?.maculas_iris ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="catarata"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Catarata:
                    </label>
                    <Field
                      type="checkbox"
                      id="catarata"
                      name="catarata"
                      value={values?.catarata}
                      checked={values?.catarata ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="leucoma"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Leucoma:
                    </label>
                    <Field
                      type="checkbox"
                      id="leucoma"
                      name="leucoma"
                      value={values?.leucoma}
                      checked={values?.leucoma ?? false}
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
                    id="obs"
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
        <div className="bg-[#b2d3f8] dark:bg-sky-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h3 className="text-lg font-semibold mb-1 ml-8 dark:text-zinc-100">
            4. Ojos
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

export default OjosForm;
