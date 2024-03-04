import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import historiaService from "./../../../services/historiaService";

const AntecedentesPForm = ({ historiaId }) => {
  const [antecedenteP, setAntecedenteP] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);
  /*carga el apartado */
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setAntecedenteP(historiaFetch.data.antecedenteP);
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
      await historiaService.guardarAntecedenteP(historiaId, {
        antecedenteP: valoresNoVacios,
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
      await historiaService.editarAntecedenteP(antecedenteP.id, {
        antecedenteP: valoresNoVacios,
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
    const antecedentePValues = {
      g_embarazo: antecedenteP ? antecedenteP.g_embarazo ?? "" : "",
      g_obs: antecedenteP ? antecedenteP.g_obs ?? "" : "",
      pat_fiebre: antecedenteP ? antecedenteP.pat_fiebre ?? "" : "",
      pat_enfInfec: antecedenteP ? antecedenteP.pat_enfInfec ?? "" : "",
      pat_diabetes: antecedenteP ? antecedenteP.pat_diabetes ?? "" : "",
      pat_epilepsia: antecedenteP ? antecedenteP.pat_epilepsia ?? "" : "",
      pat_otras: antecedenteP ? antecedenteP.pat_otras ?? "" : "",
      factFis_rayosx: antecedenteP ? antecedenteP.factFis_rayosx ?? "" : "",
      factFis_ecografia: antecedenteP
        ? antecedenteP.factFis_ecografia ?? ""
        : "",
      factFis_lugar: antecedenteP ? antecedenteP.factFis_lugar ?? "" : "",
      factFis_numVeces: antecedenteP ? antecedenteP.factFis_numVeces ?? "" : "",
      factQuim_farmacos: antecedenteP
        ? antecedenteP.factQuim_farmacos ?? ""
        : "",
      factQuim_farmOtros: antecedenteP
        ? antecedenteP.factQuim_farmOtros ?? ""
        : "",
      factQuim_anticonceptivos: antecedenteP
        ? antecedenteP.factQuim_anticonceptivos ?? ""
        : "",
      fact_Quim_gestagenosAB: antecedenteP
        ? antecedenteP.fact_Quim_gestagenosAB ?? ""
        : "",
      factQuim_expProfesional: antecedenteP
        ? antecedenteP.factQuim_expProfesional ?? ""
        : "",
      factQuim_enolismo: antecedenteP
        ? antecedenteP.factQuim_enolismo ?? ""
        : "",
      gesta: antecedenteP ? antecedenteP.gesta ?? "" : "",
      gesta_para: antecedenteP ? antecedenteP.gesta_para ?? "" : "",
      gesta_nroNativivos: antecedenteP
        ? antecedenteP.gesta_nroNativivos ?? ""
        : "",
      gesta_malformados: antecedenteP
        ? antecedenteP.gesta_malformados ?? ""
        : "",
      gesta_nroNatimortos: antecedenteP
        ? antecedenteP.gesta_nroNatimortos ?? ""
        : "",
      gesta_nroAB: antecedenteP ? antecedenteP.gesta_nroAB ?? "" : "",
      gesta_exp: antecedenteP ? antecedenteP.gesta_exp ?? "" : "",
      gesta_anticonceptivos: antecedenteP
        ? antecedenteP.gesta_anticonceptivos ?? ""
        : "",
      gesta_anticonsTipo: antecedenteP
        ? antecedenteP.gesta_anticonsTipo ?? ""
        : "",
      gesta_periodo_1_2: antecedenteP
        ? antecedenteP.gesta_periodo_1_2 ?? ""
        : "",
      gesta_periodo_2_3: antecedenteP
        ? antecedenteP.gesta_periodo_2_3 ?? ""
        : "",
      gesta_periodo_3_4: antecedenteP
        ? antecedenteP.gesta_periodo_3_4 ?? ""
        : "",
      gesta_periodoUso: antecedenteP ? antecedenteP.gesta_periodoUso ?? "" : "",
      parto: antecedenteP ? antecedenteP.parto ?? "" : "",
      parto_porque: antecedenteP ? antecedenteP.parto_porque ?? "" : "",
      dn_peso: antecedenteP ? antecedenteP.dn_peso ?? "" : "",
      dn_talla: antecedenteP ? antecedenteP.dn_talla ?? "" : "",
      dn_pc: antecedenteP ? antecedenteP.dn_pc ?? "" : "",
      dn_apgar: antecedenteP ? antecedenteP.dn_apgar ?? "" : "",
      dn_llanto: antecedenteP ? antecedenteP.dn_llanto ?? "" : "",
      dn_oxigeno: antecedenteP ? antecedenteP.dn_oxigeno ?? "" : "",
      dn_ictericia: antecedenteP ? antecedenteP.dn_ictericia ?? "" : "",
      dn_cianosis: antecedenteP ? antecedenteP.dn_cianosis ?? "" : "",
      dn_incubadora: antecedenteP ? antecedenteP.dn_incubadora ?? "" : "",
      dn_fotop: antecedenteP ? antecedenteP.dn_fotop ?? "" : "",
      dn_exsanguineo: antecedenteP ? antecedenteP.dn_exsanguineo ?? "" : "",
      dn_exsan_fiebre: antecedenteP ? antecedenteP.dn_exsan_fiebre ?? "" : "",
      dn_exsan_convul: antecedenteP ? antecedenteP.dn_exsan_convul ?? "" : "",
      dn_hemorragia: antecedenteP ? antecedenteP.dn_hemorragia ?? "" : "",
      dn_hemoIni: antecedenteP ? antecedenteP.dn_hemoIni ?? "" : "",
      dn_hemoDura: antecedenteP ? antecedenteP.dn_hemoDura ?? "" : "",
      dn_altCriptorquidea: antecedenteP
        ? antecedenteP.dn_altCriptorquidea ?? ""
        : "",
      dn_altCardiopatia: antecedenteP
        ? antecedenteP.dn_altCardiopatia ?? ""
        : "",
      dn_altFlap: antecedenteP ? antecedenteP.dn_altFlap ?? "" : "",
      dn_altAnal: antecedenteP ? antecedenteP.dn_altAnal ?? "" : "",
      dn_altNeural: antecedenteP ? antecedenteP.dn_altNeural ?? "" : "",
      dn_altObs: antecedenteP ? antecedenteP.dn_altObs ?? "" : "",
    };
    return (
      <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-4 shadow-lg w-9/12">
        <Formik
          enableReinitialize
          initialValues={antecedentePValues}
          onSubmit={handleFun}
        >
          {({ values, handleSubmit, isValidating, isValid, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
              <div className="">
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    1 Gestación:
                  </span>
                  <div className="flex flex-row max-xl:flex-col">
                    <label
                      htmlFor="g_embarazo"
                      className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                    >
                      Embarazo:
                    </label>
                    <Field
                      as="select"
                      name="g_embarazo"
                      value={values?.g_embarazo}
                      disabled={!isCreate && !editando}
                      className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-56 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                    >
                      <option value="" disabled hidden>
                        Seleccione una opción
                      </option>
                      <option value="a termino">a término</option>
                      <option value="a termino">pre-término</option>
                      <option value="a termino">post-término</option>
                    </Field>
                  </div>

                  <label
                    htmlFor="g_obs"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Obs.:
                  </label>

                  <Field
                    component="textarea"
                    name="g_obs"
                    value={values?.g_obs}
                    placeholder="..."
                    rows={3}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    2 Patologías en el embarazo:
                  </span>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-evenly">
                    <div>
                      <label
                        htmlFor="pat_fiebre"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Fiebre:
                      </label>
                      <Field
                        type="checkbox"
                        name="pat_fiebre"
                        value={values?.pat_fiebre}
                        checked={values?.pat_fiebre ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pat_enfInfec"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Enf. Infec.:
                      </label>
                      <Field
                        type="checkbox"
                        name="pat_enfInfec"
                        value={values?.pat_enfInfec}
                        checked={values?.pat_enfInfec ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 "
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pat_diabetes"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Diabetes:
                      </label>
                      <Field
                        type="checkbox"
                        name="pat_diabetes"
                        value={values?.pat_diabetes}
                        checked={values?.pat_diabetes ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 "
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pat_epilepsia"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Epilepsia:
                      </label>
                      <Field
                        type="checkbox"
                        name="pat_epilepsia"
                        value={values?.pat_epilepsia}
                        checked={values?.pat_epilepsia ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 "
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="pat_otras"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Otras enfermedades crónicas.:
                  </label>

                  <Field
                    component="textarea"
                    name="pat_otras"
                    value={values?.pat_otras}
                    placeholder="..."
                    rows={2}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    3 Factores físicos durante el embarazo:
                  </span>

                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-evenly">
                    <div>
                      <label
                        htmlFor="factFis_rayosx"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Rayos X:
                      </label>
                      <Field
                        as="select"
                        name="factFis_rayosx"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.factFis_rayosx}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="factFis_ecografia"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Ecografia:
                      </label>
                      <Field
                        as="select"
                        name="factFis_ecografia"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.factFis_ecografia}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                  </div>
                  <label
                    htmlFor="factFis_lugar"
                    className="pt-2 mb-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Lugar donde se realizó:
                  </label>

                  <Field
                    component="textarea"
                    name="factFis_lugar"
                    value={values?.factFis_lugar}
                    placeholder="..."
                    rows={2}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="factFis_numVeces"
                    className="mt-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Nº de veces:
                  </label>
                  <Field
                    type="number"
                    name="factFis_numVeces"
                    placeholder="0"
                    value={values?.factFis_numVeces}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-32 mr-[52%] dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    4 Factores químicos durante la gestación:
                  </span>
                  <label
                    htmlFor="factQuim_farmacos"
                    className="pt-2 mb-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Fármacos anticonvulsivantes:
                  </label>

                  <Field
                    component="textarea"
                    name="factQuim_farmacos"
                    value={values?.factQuim_farmacos}
                    placeholder="..."
                    rows={2}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="factQuim_farmOtros"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Otros:
                  </label>

                  <Field
                    component="textarea"
                    name="factQuim_farmOtros"
                    value={values?.factQuim_farmOtros}
                    placeholder="..."
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="factQuim_anticonceptivos"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Anticonceptivos orales:
                  </label>

                  <Field
                    component="textarea"
                    name="factQuim_anticonceptivos"
                    placeholder="..."
                    value={values?.factQuim_anticonceptivos}
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="fact_Quim_gestagenosAB"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Gestágenos para evitar AB.:
                  </label>

                  <Field
                    component="textarea"
                    name="fact_Quim_gestagenosAB"
                    placeholder="..."
                    value={values?.fact_Quim_gestagenosAB}
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="factQuim_expProfesional"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Exposición Profesional:
                  </label>

                  <Field
                    component="textarea"
                    name="factQuim_expProfesional"
                    value={values?.factQuim_expProfesional}
                    placeholder="..."
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="factQuim_enolismo"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Enolismo:
                  </label>

                  <Field
                    component="textarea"
                    name="factQuim_enolismo"
                    value={values?.factQuim_enolismo}
                    placeholder="..."
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    5 Gesta:
                  </span>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div className="">
                      <label
                        htmlFor="gesta"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Gesta:
                      </label>
                      <Field
                        type="number"
                        name="gesta"
                        value={values?.gesta}
                        placeholder="0"
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_para"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Para:
                      </label>
                      <Field
                        type="number"
                        name="gesta_para"
                        placeholder="0"
                        value={values?.gesta_para}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_nroNativivos"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Nº Nativivos:
                      </label>
                      <Field
                        type="number"
                        name="gesta_nroNativivos"
                        placeholder="0"
                        value={values?.gesta_nroNativivos}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_malformados"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Malformados:
                      </label>
                      <Field
                        type="number"
                        name="gesta_malformados"
                        placeholder="0"
                        value={values?.gesta_malformados}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div className="">
                      <label
                        htmlFor="gesta_nroNatimortos"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Nº Natimortos:
                      </label>
                      <Field
                        type="number"
                        name="gesta_nroNatimortos"
                        placeholder="0"
                        value={values?.gesta_nroNatimortos}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_nroAB"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Nº AB:
                      </label>
                      <Field
                        type="number"
                        name="gesta_nroAB"
                        placeholder="0"
                        value={values?.gesta_nroAB}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_exp"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Exp:
                      </label>
                      <Field
                        type="number"
                        name="gesta_exp"
                        placeholder="0"
                        value={values?.gesta_exp}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div>
                      <label
                        htmlFor="gesta_anticonceptivos"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Ind. de uso de anticonceptivos:
                      </label>
                      <Field
                        as="select"
                        name="gesta_anticonceptivos"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.gesta_anticonceptivos}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="gesta_anticonsTipo"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Tipo:
                      </label>
                      <Field
                        component="textarea"
                        name="gesta_anticonsTipo"
                        value={values?.gesta_anticonsTipo}
                        rows={1}
                        placeholder="..."
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div className="">
                      <label
                        htmlFor="gesta_periodo_1_2"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Período entre 1º y 2º semana gestación:
                      </label>
                      <Field
                        type="number"
                        name="gesta_periodo_1_2"
                        placeholder="0"
                        value={values?.gesta_periodo_1_2}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_periodo_2_3"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        2º y 3º:
                      </label>
                      <Field
                        type="number"
                        name="gesta_periodo_2_3"
                        placeholder="0"
                        value={values?.gesta_periodo_2_3}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gesta_periodo_3_4"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        3º y 4º:
                      </label>
                      <Field
                        type="number"
                        name="gesta_periodo_3_4"
                        placeholder="0"
                        value={values?.gesta_periodo_3_4}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="gesta_periodoUso"
                    className="pt-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Período de uso:
                  </label>

                  <Field
                    component="textarea"
                    name="gesta_periodoUso"
                    placeholder="..."
                    value={values?.gesta_periodoUso}
                    rows={1}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    6 Parto:
                  </span>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center">
                    <label
                      htmlFor="parto"
                      className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                    >
                      Parto:
                    </label>
                    <Field
                      as="select"
                      name="parto"
                      value={values?.parto}
                      disabled={!isCreate && !editando}
                      className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-56 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                    >
                      <option value="" disabled hidden>
                        Seleccione una opción
                      </option>
                      <option value="eutócico">Eutócico</option>
                      <option value="cesárea">Cesárea</option>
                      <option value="forceps">Forceps</option>
                    </Field>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center">
                    <label
                      htmlFor="parto_porque"
                      className="mr-2 mb-1 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                    >
                      ¿Por qué?:
                    </label>

                    <Field
                      component="textarea"
                      name="parto_porque"
                      placeholder="..."
                      value={values?.parto_porque}
                      rows={1}
                      className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-3/5 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                      disabled={!isCreate && !editando}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-evenly mb-3 max-xl:flex-col">
                  <span className="font-inter font-semibold text-gray-600 text-lg max-xl:text-sm dark:text-white/75">
                    7 Datos del Nacimiento:
                  </span>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div className="flex items-center">
                      <label
                        htmlFor="dn_peso"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Peso:
                      </label>
                      <Field
                        component="textarea"
                        name="dn_peso"
                        value={values?.dn_peso}
                        rows={1}
                        placeholder="..."
                        className="p-2 text-base w-28 max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="dn_talla"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Talla:
                      </label>
                      <Field
                        component="textarea"
                        name="dn_talla"
                        value={values?.dn_talla}
                        rows={1}
                        placeholder="..."
                        className="p-2 w-28 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_pc"
                        className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        PC:
                      </label>
                      <Field
                        type="number"
                        step="0.1"
                        placeholder="0.0..."
                        name="dn_pc"
                        value={values?.dn_pc}
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-20 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="dn_apgar"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        APGAR:
                      </label>
                      <Field
                        component="textarea"
                        name="dn_apgar"
                        value={values?.dn_apgar}
                        rows={1}
                        placeholder="..."
                        className="p-2 text-base w-28 max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div>
                      <label
                        htmlFor="dn_llanto"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Llanto:
                      </label>
                      <Field
                        as="select"
                        name="dn_llanto"
                        value={values?.dn_llanto}
                        disabled={!isCreate && !editando}
                        className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                      >
                        <option value="" disabled hidden>
                          Seleccione
                        </option>
                        <option value="Inmediato">Inmediato</option>
                        <option value="Tardio">Tardio</option>
                        <option value="No sabe">No sabe</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="dn_oxigeno"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Oxígeno terapia:
                      </label>
                      <Field
                        as="select"
                        name="dn_oxigeno"
                        value={values?.dn_oxigeno}
                        disabled={!isCreate && !editando}
                        className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                      >
                        <option value="" disabled hidden>
                          Seleccione
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                        <option value="No sabe">No sabe</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="dn_ictericia"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Ictericia Neonatal:
                      </label>
                      <Field
                        as="select"
                        name="dn_ictericia"
                        value={values?.dn_ictericia}
                        disabled={!isCreate && !editando}
                        className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                      >
                        <option value="" disabled hidden>
                          Seleccione
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                        <option value="No sabe">No sabe</option>
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div>
                      <label
                        htmlFor="dn_cianosis"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Cianosis:
                      </label>
                      <Field
                        as="select"
                        name="dn_cianosis"
                        value={values?.dn_cianosis}
                        disabled={!isCreate && !editando}
                        className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                      >
                        <option value="" disabled hidden>
                          Seleccione
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                        <option value="No sabe">No sabe</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="dn_incubadora"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Incubadora:
                      </label>
                      <Field
                        as="select"
                        name="dn_incubadora"
                        value={values?.dn_incubadora}
                        disabled={!isCreate && !editando}
                        className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                      >
                        <option value="" disabled hidden>
                          Seleccione
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                        <option value="No sabe">No sabe</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="dn_fotop"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Fototerapia:
                      </label>
                      <Field
                        as="select"
                        name="dn_fotop"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.dn_fotop}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div>
                      <label
                        htmlFor="dn_exsanguineo"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Exsanguíneo:
                      </label>
                      <Field
                        as="select"
                        name="dn_exsanguineo"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.dn_exsanguineo}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="dn_exsan_fiebre"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Fiebre:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_exsan_fiebre"
                        value={values?.dn_exsan_fiebre}
                        checked={values?.dn_exsan_fiebre ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_exsan_convul"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Convulsiones:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_exsan_convul"
                        value={values?.dn_exsan_convul}
                        checked={values?.dn_exsan_convul ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_hemorragia"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Hemorragias:
                      </label>
                      <Field
                        as="select"
                        name="dn_hemorragia"
                        className="px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                        value={values?.dn_hemorragia}
                      >
                        <option value="" disabled hidden>
                          Selecciona
                        </option>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3 mb-2">
                    <div className="flex flex-col">
                      <label
                        htmlFor="dn_hemoIni"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Hemorragia Inicio:
                      </label>
                      <Field
                        component="textarea"
                        name="dn_hemoIni"
                        value={values?.dn_hemoIni}
                        rows={1}
                        placeholder="..."
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div className="flex mt-2 flex-col">
                      <label
                        htmlFor="dn_hemoDura"
                        className=" mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                      >
                        Hemorragia Duración:
                      </label>
                      <Field
                        component="textarea"
                        name="dn_hemoDura"
                        value={values?.dn_hemoDura}
                        rows={1}
                        placeholder="..."
                        className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <span className="font-inter font-semibold text-indigo-600 text-sm max-xl:text-sm dark:text-indigo-400/75">
                    Otras alteraciones:
                  </span>
                  <div className="flex flex-row mt-3 mb-2 max-xl:flex-col items-center justify-between">
                    <div>
                      <label
                        htmlFor="dn_altCriptorquidea"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Criptorquidea:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_altCriptorquidea"
                        value={values?.dn_altCriptorquidea}
                        checked={values?.dn_altCriptorquidea ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_altCardiopatia"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Cardiopatía Congénita:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_altCardiopatia"
                        value={values?.dn_altCardiopatia}
                        checked={values?.dn_altCardiopatia ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_altFlap"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Flap:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_altFlap"
                        value={values?.dn_altFlap}
                        checked={values?.dn_altFlap ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_altAnal"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Atresia anal:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_altAnal"
                        value={values?.dn_altAnal}
                        checked={values?.dn_altAnal ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dn_altNeural"
                        className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        disabled={!isCreate && !editando}
                      >
                        Defectos del tubo Neural:
                      </label>
                      <Field
                        type="checkbox"
                        name="dn_altNeural"
                        value={values?.dn_altNeural}
                        checked={values?.dn_altNeural ?? false}
                        className=" text-base max-xl:text-sm text-sky-600 shadow appearance-none border border-gray-300 bg-stone-200 rounded-sm  dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        disabled={!isCreate && !editando}
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="dn_altObs"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Obs.:
                  </label>

                  <Field
                    component="textarea"
                    name="dn_altObs"
                    placeholder="..."
                    value={values?.dn_altObs}
                    rows={3}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
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
      {antecedenteP === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-bold text-lg">
            Antecedentes Personales
          </h4>
          <hr className="mb-3 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200 max-w-lg" />
          {antecedenteP ? (
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

export default AntecedentesPForm;
