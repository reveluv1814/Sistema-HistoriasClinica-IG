import React, { useEffect, useState } from "react";
import exploracionFisicaService from "../../../../services/exploracionFisicaService";
import { Field, Form, Formik } from "formik";

const MiembrosForm = ({ expFisicaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const exploracionFFetch =
        await exploracionFisicaService.apartadosExploracionF(expFisicaId);
      setDatos(exploracionFFetch.data.miembros);
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
      await exploracionFisicaService.guardarMiembros(expFisicaId, {
        miembros: valoresNoVacios,
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
      await exploracionFisicaService.editarMiembros(datos.id, {
        miembros: valoresNoVacios,
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
      supManosP: datos ? datos.supManosP ?? "" : "",
      supBraquiactilia: datos ? datos.supBraquiactilia ?? "" : "",
      supAracnodactilia: datos ? datos.supAracnodactilia ?? "" : "",
      supPolidactilia: datos ? datos.supPolidactilia ?? "" : "",
      supTipoPoli: datos ? datos.supTipoPoli ?? "" : "",
      supSindactilia: datos ? datos.supSindactilia ?? "" : "",
      supCutanea: datos ? datos.supCutanea ?? "" : "",
      supOsea: datos ? datos.supOsea ?? "" : "",
      supDedos: datos ? datos.supDedos ?? "" : "",
      supPliegueSimeano: datos ? datos.supPliegueSimeano ?? "" : "",
      supPliegueCompleto: datos ? datos.supPliegueCompleto ?? "" : "",
      supPliegueImcompleto: datos ? datos.supPliegueImcompleto ?? "" : "",
      supPliegueQuinto: datos ? datos.supPliegueQuinto ?? "" : "",
      supHipoplasia: datos ? datos.supHipoplasia ?? "" : "",
      supClinodactilia: datos ? datos.supClinodactilia ?? "" : "",
      supEspDedos: datos ? datos.supEspDedos ?? "" : "",
      supCavalgamiento: datos ? datos.supCavalgamiento ?? "" : "",
      supDeformidad: datos ? datos.supDeformidad ?? "" : "",
      supObs: datos ? datos.supObs ?? "" : "",
      infPiePeque: datos ? datos.infPiePeque ?? "" : "",
      infPolidactilia: datos ? datos.infPolidactilia ?? "" : "",
      infImplantacion: datos ? datos.infImplantacion ?? "" : "",
      infSindactilia: datos ? datos.infSindactilia ?? "" : "",
      infCutanea: datos ? datos.infCutanea ?? "" : "",
      infOsea: datos ? datos.infOsea ?? "" : "",
      infDedos: datos ? datos.infDedos ?? "" : "",
      infCavo: datos ? datos.infCavo ?? "" : "",
      infCalcaneo: datos ? datos.infCalcaneo ?? "" : "",
      infEquino: datos ? datos.infEquino ?? "" : "",
      infVaro: datos ? datos.infVaro ?? "" : "",
      infValgo: datos ? datos.infValgo ?? "" : "",
      infPiePlano: datos ? datos.infPiePlano ?? "" : "",
      infDistancia: datos ? datos.infDistancia ?? "" : "",
      infObs: datos ? datos.infObs ?? "" : "",
      artiLimitaciones: datos ? datos.artiLimitaciones ?? "" : "",
      artiHiperex: datos ? datos.artiHiperex ?? "" : "",
      artiContracion: datos ? datos.artiContracion ?? "" : "",
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
                <h4 className="font-inter font-semibold text-base">
                  A. Superiores:
                </h4>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="supManosP"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Manos pequeñas:
                    </label>
                    <Field
                      type="checkbox"
                      name="supManosP"
                      value={values?.supManosP}
                      checked={values?.supManosP ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supBraquiactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Braquidactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="supBraquiactilia"
                      value={values?.supBraquiactilia}
                      checked={values?.supBraquiactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supAracnodactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Aracnodactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="supAracnodactilia"
                      value={values?.supAracnodactilia}
                      checked={values?.supAracnodactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supPolidactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Polidactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="supPolidactilia"
                      value={values?.supPolidactilia}
                      checked={values?.supPolidactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="supTipoPoli"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Tipo de polidactilia:
                  </label>
                  <Field
                    component="textarea"
                    name="supTipoPoli"
                    value={values?.supTipoPoli}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="supSindactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Sindactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="supSindactilia"
                      value={values?.supSindactilia}
                      checked={values?.supSindactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supCutanea"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Cutánea:
                    </label>
                    <Field
                      type="checkbox"
                      name="supCutanea"
                      value={values?.supCutanea}
                      checked={values?.supCutanea ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supOsea"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Ósea:
                    </label>
                    <Field
                      type="checkbox"
                      name="supOsea"
                      value={values?.supOsea}
                      checked={values?.supOsea ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="supDedos"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Dedos:
                  </label>
                  <Field
                    component="textarea"
                    name="supDedos"
                    value={values?.supDedos}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="supPliegueSimeano"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Pliegue Simeano:
                    </label>
                    <Field
                      type="checkbox"
                      name="supPliegueSimeano"
                      value={values?.supPliegueSimeano}
                      checked={values?.supPliegueSimeano ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supPliegueCompleto"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Completo:
                    </label>
                    <Field
                      type="checkbox"
                      name="supPliegueCompleto"
                      value={values?.supPliegueCompleto}
                      checked={values?.supPliegueCompleto ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supPliegueImcompleto"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Imcompleto:
                    </label>
                    <Field
                      type="checkbox"
                      name="supPliegueImcompleto"
                      value={values?.supPliegueImcompleto}
                      checked={values?.supPliegueImcompleto ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supPliegueQuinto"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Pliegue único en el 5º dedo:
                    </label>
                    <Field
                      type="checkbox"
                      name="supPliegueQuinto"
                      value={values?.supPliegueQuinto}
                      checked={values?.supPliegueQuinto ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="supHipoplasia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Hipoplasia de la 2º falange del 5º dedo:
                    </label>
                    <Field
                      type="checkbox"
                      name="supHipoplasia"
                      value={values?.supHipoplasia}
                      checked={values?.supHipoplasia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supClinodactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Clinodactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="supClinodactilia"
                      value={values?.supClinodactilia}
                      checked={values?.supClinodactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="supEspDedos"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Dedo(s):
                  </label>
                  <Field
                    component="textarea"
                    name="supEspDedos"
                    value={values?.supEspDedos}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="supCavalgamiento"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Cavalgamiento de dedo(s):
                  </label>
                  <Field
                    component="textarea"
                    name="supCavalgamiento"
                    value={values?.supCavalgamiento}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div>
                  <label
                    htmlFor="supDeformidad"
                    className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Deformidad por acortamiento del miembro superior:
                  </label>
                  <Field
                    as="select"
                    name="supDeformidad"
                    className="px-1 py-0 text-sm max-xl:text-xs cursor-pointer text-zinc-700 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                    disabled={!isCreate && !editando}
                    value={values?.supDeformidad ?? ""}
                  >
                    <option value="" disabled hidden>
                      Selecciona
                    </option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </Field>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="supObs"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Obs:
                  </label>
                  <Field
                    component="textarea"
                    name="supObs"
                    value={values?.supObs}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <h4 className="font-inter font-semibold text-base">
                  B. Inferiores:
                </h4>
                <div className="flex flex-row justify-evenly mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="infPiePeque"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Pies pequeños:
                    </label>
                    <Field
                      type="checkbox"
                      name="infPiePeque"
                      value={values?.infPiePeque}
                      checked={values?.infPiePeque ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infPolidactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Polidactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="infPolidactilia"
                      value={values?.infPolidactilia}
                      checked={values?.infPolidactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="infImplantacion"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Implantación de dedo(s) extra(s):
                  </label>
                  <Field
                    component="textarea"
                    name="infImplantacion"
                    value={values?.infImplantacion}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <label
                      htmlFor="infSindactilia"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Sindactilia:
                    </label>
                    <Field
                      type="checkbox"
                      name="infSindactilia"
                      value={values?.infSindactilia}
                      checked={values?.infSindactilia ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infCutanea"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Cutánea:
                    </label>
                    <Field
                      type="checkbox"
                      name="infCutanea"
                      value={values?.infCutanea}
                      checked={values?.infCutanea ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infOsea"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Ósea:
                    </label>
                    <Field
                      type="checkbox"
                      name="infOsea"
                      value={values?.infOsea}
                      checked={values?.infOsea ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="infDedos"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Dedos:
                  </label>
                  <Field
                    component="textarea"
                    name="infDedos"
                    value={values?.infDedos}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-row justify-between mb-3 max-md:flex-col">
                  <div>
                    <span className="mr-2 text-sm max-xl:text-xs font-bold text-gray-800 dark:text-gray-300">
                      Alt.congénita:
                    </span>
                    <label
                      htmlFor="infCavo"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Cavo:
                    </label>
                    <Field
                      type="checkbox"
                      name="infCavo"
                      value={values?.infCavo}
                      checked={values?.infCavo ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infCalcaneo"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Calcáneo:
                    </label>
                    <Field
                      type="checkbox"
                      name="infCalcaneo"
                      value={values?.infCalcaneo}
                      checked={values?.infCalcaneo ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infEquino"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Equino:
                    </label>
                    <Field
                      type="checkbox"
                      name="infEquino"
                      value={values?.infEquino}
                      checked={values?.infEquino ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infVaro"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Varo:
                    </label>
                    <Field
                      type="checkbox"
                      name="infVaro"
                      value={values?.infVaro}
                      checked={values?.infVaro ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infValgo"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Valgo:
                    </label>
                    <Field
                      type="checkbox"
                      name="infValgo"
                      value={values?.infValgo}
                      checked={values?.infValgo ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="infPiePlano"
                      className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                      disabled={!isCreate && !editando}
                    >
                      Pie plano:
                    </label>
                    <Field
                      type="checkbox"
                      name="infPiePlano"
                      value={values?.infPiePlano}
                      checked={values?.infPiePlano ?? false}
                      className="text-sm max-xl:text-xs text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="infDistancia"
                    className="mr-2 text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Distancia aumentada entre halux y 2º dedo. Deformidad por
                    reducción del miembro inferior:
                  </label>
                  <Field
                    as="select"
                    name="infDistancia"
                    className="px-1 py-0 text-sm max-xl:text-xs cursor-pointer text-zinc-700 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                    disabled={!isCreate && !editando}
                    value={values?.infDistancia ?? ""}
                  >
                    <option value="" disabled hidden>
                      Selecciona
                    </option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </Field>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="infObs"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Obs:
                  </label>
                  <Field
                    component="textarea"
                    name="infObs"
                    value={values?.infObs}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <h4 className="font-inter font-semibold text-base">
                  C. Articulaciones:
                </h4>
                <div className="w-full">
                  <label
                    htmlFor="artiLimitaciones"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Limitación de movimientos:
                  </label>
                  <Field
                    component="textarea"
                    name="artiLimitaciones"
                    value={values?.artiLimitaciones}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="artiHiperex"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Hiperextensibilidad articular:
                  </label>
                  <Field
                    component="textarea"
                    name="artiHiperex"
                    value={values?.artiHiperex}
                    placeholder="..."
                    rows={1}
                    className="p-1 px-2 text-sm max-xl:text-xs text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="artiContracion"
                    className="text-sm max-xl:text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    Contracción generalizada por flexión de las articulaciones
                    de miembros - luxación congénita, Especificar:
                  </label>
                  <Field
                    component="textarea"
                    name="artiContracion"
                    value={values?.artiContracion}
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
        <div className="bg-indigo-300 dark:bg-sky-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h3 className="text-lg font-semibold mb-1 ml-8 dark:text-zinc-100">
            12. Miembros
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

export default MiembrosForm;
