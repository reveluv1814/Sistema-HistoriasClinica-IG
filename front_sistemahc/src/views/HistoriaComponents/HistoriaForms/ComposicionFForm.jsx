import React, { useEffect, useState } from "react";
import historiaService from "./../../../services/historiaService";
import Modal from "../../../components/Modal";
import { Field, Form, Formik } from "formik";

const ComposicionFForm = ({ historiaId }) => {
  const [composicionesF, setComposicionesF] = useState("load");
  const [agregarFamiliarModal, setAgregarFamiliarModal] = useState(false);
  /*carga el apartado */
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setComposicionesF(historiaFetch.data.composicionesF);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApartado();
  }, []);

  const closeAddFamiliar = () => {
    setAgregarFamiliarModal(false);
  };

  const handlePost = async (values, actions) => {
    try {
      await historiaService.guardarComposicionF(historiaId, {
        composicionF: values,
      });
      getApartado();
      actions.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setAgregarFamiliarModal(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await historiaService.eliminarComposicionF(id);
    } catch (error) {
      console.log(error);
    } finally {
      getApartado();
    }
  };
  const ButtonAddFamiliar = () => {
    return (
      <button
        className="flex flex-row ml-auto bg-blue-500 dark:bg-blue-600 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 max-xl:text-xs"
        onClick={() => setAgregarFamiliarModal(!agregarFamiliarModal)}
      >
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            className="w-8 h-10 p-1 bg-blue-600 dark:bg-blue-700 text-white mr-2 rounded-tl-md rounded-bl-md"
            viewBox="0 0 640 512"
          >
            <path
              d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              fill="currentColor"
            />
          </svg>
        </div>
        Agregar Familiar
      </button>
    );
  };

  return (
    <>
      {composicionesF === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-semibold text-xl dark:text-zinc-200 max-xl:text-xs">
            Composición de la Familia
          </h4>
          <hr className="mb-3 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200/60 max-w-lg" />
          <div className="flex flex-row flex-wrap justify-center">
            {composicionesF.length === 0 ? (
              <div className="flex items-center justify-center flex-col">
                <span className="text-xl italic font-medium">
                  Sin datos ...
                </span>
                <ButtonAddFamiliar />
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <div className="overflow-x-auto bg-white dark:bg-neutral-700 rounded-md">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                      <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 max-xl:text-[9px]">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Gestación Nº
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nombre del hijo
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Sexo
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Edad
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Fecha nac.
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Obs.
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {composicionesF.map((compF) => {
                          const fechaFormateada =
                            compF.fechanac !== null
                              ? (() => {
                                  const fecha = new Date(compF.fechanac);
                                  const dia = fecha
                                    .getUTCDate()
                                    .toString()
                                    .padStart(2, "0");
                                  const mes = (fecha.getUTCMonth() + 1)
                                    .toString()
                                    .padStart(2, "0");
                                  const año = fecha.getUTCFullYear();
                                  return `${dia}/${mes}/${año}`;
                                })()
                              : null;

                          return (
                            <>
                              <tr
                                key={compF.id}
                                className="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 max-xl:text-[10px]"
                              >
                                <td className="px-6 py-4">
                                  {compF.nrogestacion || "sin dato"}
                                </td>
                                <td className="px-6 py-4">
                                  {compF.nomHijo || "sin dato"}
                                </td>
                                <td className="px-6 py-4">
                                  {compF.sexo || "sin dato"}
                                </td>
                                <td className="px-6 py-4">
                                  {compF.edad || "sin dato"}
                                </td>
                                <td className="px-6 py-4">
                                  {fechaFormateada || "sin dato"}
                                </td>
                                <td className="px-6 py-4 whitespace-normal">
                                  {compF.obs || "sin dato"}
                                </td>
                                <td className="py-3 flex items-center justify-center">
                                  <button
                                    className="py-1 px-2 bg-rose-500 text-white hover:bg-rose-600 rounded ml-2"
                                    onClick={() => handleDelete(compF.id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 max-2xl:w-4 max-2xl:h-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-2">
                    <ButtonAddFamiliar />
                  </div>
                </div>
              </>
            )}
          </div>
          <Modal
            modalOpen={agregarFamiliarModal}
            setOpenModal={closeAddFamiliar}
            title={"Agregar Familiar"}
            contenido={"shadow shadow-blue-500/40"}
          >
            <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-4 shadow-lg">
              <Formik
                enableReinitialize
                initialValues={{
                  nrogestacion: null,
                  nomHijo: "",
                  sexo: "",
                  fechanac: null,
                  obs: "",
                }}
                onSubmit={handlePost}
              >
                {({ handleSubmit, isValidating, isValid, isSubmitting }) => (
                  <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
                    <div className="">
                      <div className="flex flex-col justify-evenly mb-2">
                        <div className="flex flex-row mb-2">
                          <label
                            htmlFor="nrogestacion"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                          >
                            Nro.de Gestación:
                          </label>
                          <Field
                            type="number"
                            name="nrogestacion"
                            placeholder="0"
                            className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-24 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                          />
                        </div>
                        <div className="flex flex-row mb-2">
                          <label
                            htmlFor="nomHijo"
                            className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300 max-xl:w-32"
                          >
                            Nombre completo:
                          </label>
                          <Field
                            type="text"
                            name="nomHijo"
                            placeholder="..."
                            className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-1/2 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:w-64"
                          />
                        </div>
                        <div className="flex flex-row  max-xl:flex-col items-center justify-around">
                          <div className="flex flex-row">
                            <label
                              htmlFor="sexo"
                              className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                            >
                              Sexo:
                            </label>
                            <Field
                              as="select"
                              name="sexo"
                              className=" px-2 text-base cursor-pointer max-xl:text-sm text-zinc-500 shadow appearance-none border border-gray-300 bg-zinc-200 rounded-lg w-32 dark:bg-zinc-600 dark:border-zinc-700 dark:text-gray-300 "
                            >
                              <option value="" disabled>
                                Seleccione una opción
                              </option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Field>
                          </div>
                          <div className="flex flex-row">
                            <label
                              htmlFor="fechanac"
                              className="pt-1 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300 max-xl:ml-0"
                            >
                              Fecha Nac.:
                            </label>
                            <Field
                              type="date"
                              name="fechanac"
                              className="p-1 text-base max-xl:text-sm text-zinc-700 cursor-pointer shadow-md appearance-none border border-blue-500 bg-blue-300 rounded-lg  dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 max-xl:w-64"
                            />
                          </div>
                        </div>
                        <label
                          htmlFor="obs"
                          className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                        >
                          Obs.:
                        </label>
                        <Field
                          component="textarea"
                          name="obs"
                          placeholder="..."
                          rows={3}
                          className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-full dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                        />
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || isValidating || !isValid}
                          className={`text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600`}
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
          </Modal>
        </div>
      )}
    </>
  );
};

export default ComposicionFForm;
