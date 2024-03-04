import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import historiaService from "../../../../services/historiaService";
import { Field, Form, Formik } from "formik";

const ExFisicoForm = ({ historiaId, expComplementarias }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setDatos(historiaFetch.data.exploracionF);
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
      await exploracionFisicaService.guardarExploracionF(historiaId, {
        exploracionF: valoresNoVacios,
      });
      expComplementarias();
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
      await exploracionFisicaService.editarExploracionF(datos.id, {
        exploracionF: valoresNoVacios,
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
      peso_porcentaje: datos ? datos.peso_porcentaje ?? "" : "",
      peso: datos ? datos.peso ?? "" : "",
      talla: datos ? datos.talla ?? "" : "",
      talla_porcentaje: datos ? datos.talla_porcentaje ?? "" : "",
      pc: datos ? datos.pc ?? "" : "",
      pc_porcentaje: datos ? datos.pc_porcentaje ?? "" : "",
      pt: datos ? datos.pt ?? "" : "",
      pt_porcentaje: datos ? datos.pt_porcentaje ?? "" : "",
      envergadura: datos ? datos.envergadura ?? "" : "",
      dii: datos ? datos.dii ?? "" : "",
      dii_porcentaje: datos ? datos.dii_porcentaje ?? "" : "",
      seg_sup: datos ? datos.seg_sup ?? "" : "",
      seg_inf: datos ? datos.seg_inf ?? "" : "",
      distancia_inter: datos ? datos.distancia_inter ?? "" : "",
      bregma: datos ? datos.bregma ?? "" : "",
      largo_manoD: datos ? datos.largo_manoD ?? "" : "",
      largo_dedoMD: datos ? datos.largo_dedoMD ?? "" : "",
      distancia_intercantal: datos ? datos.distancia_intercantal ?? "" : "",
      largo_manoI: datos ? datos.largo_manoI ?? "" : "",
      largo_dedoMI: datos ? datos.largo_dedoMI ?? "" : "",
      orejaD: datos ? datos.orejaD ?? "" : "",
      orejaI: datos ? datos.orejaI ?? "" : "",
      pieD: datos ? datos.pieD ?? "" : "",
      pieI: datos ? datos.pieI ?? "" : "",
    };

    return (
      <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-3 shadow-lg w-11/12">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleFun}
        >
          {({ values, handleSubmit, isValidating, isValid, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col px-4 ">
              <div className="">
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="peso"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Peso:
                    </label>
                    <Field
                      type="number"
                      name="peso"
                      placeholder="0.0"
                      value={values?.peso}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <label
                      htmlFor="peso_porcentaje"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      gr./
                    </label>
                    <Field
                      type="number"
                      name="peso_porcentaje"
                      placeholder="0.0"
                      value={values?.peso_porcentaje}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      %
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="talla"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Talla:
                    </label>
                    <Field
                      type="number"
                      name="talla"
                      placeholder="0.0"
                      value={values?.talla}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-14 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <label
                      htmlFor="talla_porcentaje"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      cm./
                    </label>
                    <Field
                      type="number"
                      name="talla_porcentaje"
                      placeholder="0.0"
                      value={values?.talla_porcentaje}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      %
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="pc"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      PC:
                    </label>
                    <Field
                      type="number"
                      name="pc"
                      placeholder="0.0"
                      value={values?.pc}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-14 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <label
                      htmlFor="pc_porcentaje"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      cm./
                    </label>
                    <Field
                      type="number"
                      name="pc_porcentaje"
                      placeholder="0.0"
                      value={values?.pc_porcentaje}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      %
                    </span>
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="pt"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      PT:
                    </label>
                    <Field
                      type="number"
                      name="pt"
                      placeholder="0.0"
                      value={values?.pt}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-14 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <label
                      htmlFor="pt_porcentaje"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      cm./
                    </label>
                    <Field
                      type="number"
                      name="pt_porcentaje"
                      placeholder="0.0"
                      value={values?.pt_porcentaje}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      %
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="envergadura"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Envergadura:
                    </label>
                    <Field
                      type="number"
                      name="envergadura"
                      placeholder="0.0"
                      value={values?.envergadura}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      cm
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="dii"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      DII:
                    </label>
                    <Field
                      type="number"
                      name="dii"
                      placeholder="0.0"
                      value={values?.dii}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-14 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <label
                      htmlFor="dii_porcentaje"
                      className=" text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      mm./
                    </label>
                    <Field
                      type="number"
                      name="dii_porcentaje"
                      placeholder="0.0"
                      value={values?.dii_porcentaje}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                    <span className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300">
                      %
                    </span>
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="seg_sup"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Seg.Sup:
                    </label>
                    <Field
                      type="number"
                      name="seg_sup"
                      placeholder="0.0"
                      value={values?.seg_sup}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="seg_inf"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Seg.Inf:
                    </label>
                    <Field
                      type="number"
                      name="seg_inf"
                      placeholder="0.0"
                      value={values?.seg_inf}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="distancia_inter"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Distancia intermamilar:
                    </label>
                    <Field
                      type="number"
                      name="distancia_inter"
                      placeholder="0.0"
                      value={values?.distancia_inter}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="bregma"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Bregma:
                    </label>
                    <Field
                      type="number"
                      name="bregma"
                      placeholder="0.0"
                      value={values?.bregma}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="largo_manoD"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Largo de mano D:
                    </label>
                    <Field
                      type="number"
                      name="largo_manoD"
                      placeholder="0.0"
                      value={values?.largo_manoD}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="largo_dedoMD"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Largo dedo medio D:
                    </label>
                    <Field
                      type="number"
                      name="largo_dedoMD"
                      placeholder="0.0"
                      value={values?.largo_dedoMD}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="distancia_intercantal"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Distancia intercantal interna:
                    </label>
                    <Field
                      type="number"
                      name="distancia_intercantal"
                      placeholder="0.0"
                      value={values?.distancia_intercantal}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="largo_manoI"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Largo de mano I:
                    </label>
                    <Field
                      type="number"
                      name="largo_manoI"
                      placeholder="0.0"
                      value={values?.largo_manoI}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="largo_dedoMI"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Largo dedo medio I:
                    </label>
                    <Field
                      type="number"
                      name="largo_dedoMI"
                      placeholder="0.0"
                      value={values?.largo_dedoMI}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="orejaD"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Oreja D:
                    </label>
                    <Field
                      type="number"
                      name="orejaD"
                      placeholder="0.0"
                      value={values?.orejaD}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="orejaI"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Oreja I:
                    </label>
                    <Field
                      type="number"
                      name="orejaI"
                      placeholder="0.0"
                      value={values?.orejaI}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="pieD"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Pié D:
                    </label>
                    <Field
                      type="number"
                      name="pieD"
                      placeholder="0.0"
                      value={values?.pieD}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="pieI"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                    >
                      Pié I:
                    </label>
                    <Field
                      type="number"
                      name="pieI"
                      placeholder="0.0"
                      value={values?.pieI}
                      className="p-1 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-12 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
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
                        : "bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
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
        <div className="bg-indigo-300 dark:bg-sky-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-2">
          <h3 className="text-lg font-semibold mb-1 ml-8 dark:text-zinc-100">
            1. Examen Físico General
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
                      : "bg-amber-400 hover:bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-700"
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
                      : "bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600"
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

export default ExFisicoForm;
