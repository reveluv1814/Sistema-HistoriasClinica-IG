import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import { Field, Form, Formik } from "formik";

const CraneoFForm = ({ expFisicaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const exploracionFFetch =
        await exploracionFisicaService.apartadosExploracionF(expFisicaId);
      setDatos(exploracionFFetch.data.craneoF);
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
      await exploracionFisicaService.guardarCraneoF(expFisicaId, {
        craneoF: valoresNoVacios,
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
      await exploracionFisicaService.editarCraneoF(datos.id, {
        craneoF: valoresNoVacios,
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
      microcefalia: datos ? datos.microcefalia ?? "" : "",
      macrocefalia: datos ? datos.macrocefalia ?? "" : "",
      hidrocefalia: datos ? datos.hidrocefalia ?? "" : "",
      craneossino: datos ? datos.craneossino ?? "" : "",
      occipital_p: datos ? datos.occipital_p ?? "" : "",
      prominente: datos ? datos.prominente ?? "" : "",
      abultamiento_f: datos ? datos.abultamiento_f ?? "" : "",
      glabela_p: datos ? datos.glabela_p ?? "" : "",
      asimetria_c: datos ? datos.asimetria_c ?? "" : "",
      braquicefalia: datos ? datos.braquicefalia ?? "" : "",
      aplasia_cuero: datos ? datos.aplasia_cuero ?? "" : "",
      implantación_cabello: datos ? datos.implantación_cabello ?? "" : "",
      hipoplasia: datos ? datos.hipoplasia ?? "" : "",
      suturas: datos ? datos.suturas ?? "" : "",
      suturas_des: datos ? datos.suturas_des ?? "" : "",
      facies: datos ? datos.facies ?? "" : "",
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
                      htmlFor="microcefalia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Microcefalia:
                    </label>
                    <Field
                      type="checkbox"
                      name="microcefalia"
                      value={values?.microcefalia}
                      checked={values?.microcefalia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="macrocefalia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Macrocefalia:
                    </label>
                    <Field
                      type="checkbox"
                      name="macrocefalia"
                      value={values?.macrocefalia}
                      checked={values?.macrocefalia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hidrocefalia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Hidrocefalia:
                    </label>
                    <Field
                      type="checkbox"
                      name="hidrocefalia"
                      value={values?.hidrocefalia}
                      checked={values?.hidrocefalia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="craneossino"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Cráneosinostosis:
                    </label>
                    <Field
                      type="checkbox"
                      name="craneossino"
                      value={values?.craneossino}
                      checked={values?.craneossino ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <span className="mr-1 text-sm max-xl:text-xs font-bold text-gray-800 dark:text-gray-300">
                      Occipital:
                    </span>
                    <label
                      htmlFor="occipital_p"
                      className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Plano
                    </label>
                    <Field
                      type="checkbox"
                      name="occipital_p"
                      value={values?.occipital_p}
                      checked={values?.occipital_p ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="ml-2 mr-2 text-sm max-xl:text-xs font-bold text-gray-800 dark:text-gray-300">
                      o
                    </span>
                    <label
                      htmlFor="prominente"
                      className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Prominente
                    </label>
                    <Field
                      type="checkbox"
                      name="prominente"
                      value={values?.prominente}
                      checked={values?.prominente ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="abultamiento_f"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Abultamiento frontal:
                    </label>
                    <Field
                      type="checkbox"
                      name="abultamiento_f"
                      value={values?.abultamiento_f}
                      checked={values?.abultamiento_f ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="glabela_p"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Glabela prominente:
                    </label>
                    <Field
                      type="checkbox"
                      name="glabela_p"
                      value={values?.glabela_p}
                      checked={values?.glabela_p ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="asimetria_c"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Asimetría craneal:
                    </label>
                    <Field
                      type="checkbox"
                      name="asimetria_c"
                      value={values?.asimetria_c}
                      checked={values?.asimetria_c ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="braquicefalia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Braquicefalia:
                    </label>
                    <Field
                      type="checkbox"
                      name="braquicefalia"
                      value={values?.braquicefalia}
                      checked={values?.braquicefalia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="aplasia_cuero"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Áreas de aplasia de cuero cabelludo:
                    </label>
                    <Field
                      type="checkbox"
                      name="aplasia_cuero"
                      value={values?.aplasia_cuero}
                      checked={values?.aplasia_cuero ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="implantación_cabello"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Implantación de cabellos:
                    </label>
                    <Field
                      as="select"
                      name="implantación_cabello"
                      className="px-1 py-0 text-sm max-xl:text-xs cursor-pointer text-zinc-700 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                      value={values?.implantación_cabello ?? ""}
                    >
                      <option value="" disabled hidden>
                        Selecciona
                      </option>
                      <option value={"Normal"}>Normal</option>
                      <option value={"Alta"}>Alta</option>
                      <option value={"Baja"}>Baja</option>
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="hipoplasia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Hipoplasia malar:
                    </label>
                    <Field
                      type="checkbox"
                      name="hipoplasia"
                      value={values?.hipoplasia}
                      checked={values?.hipoplasia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="suturas"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Suturas:
                    </label>
                    <Field
                      type="checkbox"
                      name="suturas"
                      value={values?.suturas}
                      checked={values?.suturas ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between mb-3">
                  <div className="w-full">
                    <label
                      htmlFor="suturas_des"
                      className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Descripción de las suturas:
                    </label>

                    <Field
                      component="textarea"
                      name="suturas_des"
                      value={values?.suturas_des}
                      placeholder="..."
                      rows={1}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="facies"
                      className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Fácies:
                    </label>

                    <Field
                      component="textarea"
                      name="facies"
                      value={values?.facies}
                      placeholder="..."
                      rows={1}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
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
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
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
            2. Craneo Facial
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

export default CraneoFForm;
