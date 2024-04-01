import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import historiaService from "./../../../services/historiaService";

const AntecedenteFForm = ({ historiaId }) => {
  const [datos, setDatos] = useState("load");
  const [editando, setEditando] = useState(false);
  const [agregar, setAgregar] = useState(false);

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setDatos(historiaFetch.data.antecedenteF);
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
      await historiaService.guardarAntecedenteF(historiaId, {
        antecedenteF: valoresNoVacios,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getApartado();
      setAgregar(false);
    }
  };
  const handlePatch = async (values) => {
    try {
      const valoresNoVacios = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      await historiaService.editarAntecedenteF(datos.id, {
        antecedenteF: valoresNoVacios,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getApartado();
      setEditando(false);
    }
  };

  //formulario
  const Formm = ({ isCreate, handleFun }) => {
    const formatearFecha = (fecha) => {
      return fecha ? new Date(fecha).toISOString().split("T")[0] : "";
    };

    const fechaFormateadaPat = formatearFecha(datos?.fechaNac_Padre);
    const fechaFormateadaMat = formatearFecha(datos?.fechaNac_Madre);
    //valores iniciales
    const antecedenteFValues = {
      nomPadre: datos ? datos.nomPadre ?? "" : "",
      fechaNac_Padre: datos ? fechaFormateadaPat ?? "" : "",
      profesionPadre: datos ? datos.profesionPadre ?? "" : "",
      nomMadre: datos ? datos.nomMadre ?? "" : "",
      fechaNac_Madre: datos ? fechaFormateadaMat ?? "" : "",
      profesionMadre: datos ? datos.profesionMadre ?? "" : "",
      edadMat_nacP: datos ? datos.edadMat_nacP ?? "" : "",
      edadPat_nacP: datos ? datos.edadPat_nacP ?? "" : "",
      edadAbuela_nacM: datos ? datos.edadAbuela_nacM ?? "" : "",
    };
    return (
      <div className="bg-blue-100 dark:bg-sky-900 rounded-lg py-4 shadow-lg">
        <Formik
          enableReinitialize
          initialValues={antecedenteFValues}
          onSubmit={handleFun}
        >
          {({ values, handleSubmit, isValidating, isValid, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
              <div className="">
                <div className="flex flex-col justify-evenly mb-2 2xl:flex-row">
                  <label
                    htmlFor="nomPadre"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Nombre del Padre:
                  </label>

                  <Field
                    type="text"
                    placeholder="..."
                    name="nomPadre"
                    id="nomPadre"
                    value={values?.nomPadre}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-64 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="fechaNac_Padre"
                    className=" ml-4 pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300 max-xl:ml-0"
                  >
                    Fecha Nac.Padre:
                  </label>
                  <Field
                    type="date"
                    id="fechaNac_Padre"
                    name="fechaNac_Padre"
                    className="p-1 text-base max-xl:text-sm mr-4 text-zinc-700 cursor-pointer shadow-md appearance-none border border-blue-500 bg-blue-300 rounded-lg  dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 max-xl:w-64"
                    value={values?.fechaNac_Padre}
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="profesionPadre"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300 max-xl:w-32"
                  >
                    Profesión Padre:
                  </label>
                  <Field
                    type="text"
                    id="profesionPadre"
                    name="profesionPadre"
                    placeholder="..."
                    value={values?.profesionPadre}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-sm dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:w-64"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col justify-evenly mb-2 2xl:flex-row">
                  <label
                    htmlFor="nomMadre"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                    disabled={!isCreate && !editando}
                  >
                    Nombre de la Madre:
                  </label>
                  <Field
                    type="text"
                    name="nomMadre"
                    id="nomMadre"
                    placeholder="..."
                    value={values?.nomMadre}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-64 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="fechaNac_Madre"
                    className="ml-4 pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300 max-xl:ml-0"
                  >
                    Fecha Nac. Madre:{" "}
                  </label>
                  <Field
                    type="date"
                    id="fechaNac_Madre"
                    name="fechaNac_Madre"
                    value={values?.fechaNac_Madre}
                    className="p-1 text-base max-xl:text-sm mr-4 text-zinc-700 cursor-pointer shadow appearance-none border border-blue-500 bg-blue-300 rounded-lg max-w-md dark:bg-sky-800 dark:border-sky-900 dark:text-gray-300 max-xl:w-64"
                    disabled={!isCreate && !editando}
                  />
                  <label
                    htmlFor="profesionMadre"
                    className="pt-2 mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Profesión Madre:
                  </label>
                  <Field
                    type="text"
                    id="profesionMadre"
                    name="profesionMadre"
                    placeholder="..."
                    value={values?.profesionMadre}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg max-w-sm dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:w-64"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col items-center justify-between mb-2 max-md:flex-row max-md:justify-start">
                  <label
                    htmlFor="edadMat_nacP"
                    className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Edad Materna cuando nació el propósito:
                  </label>
                  <Field
                    type="number"
                    name="edadMat_nacP"
                    id="edadMat_nacP"
                    placeholder="años..."
                    value={values?.edadMat_nacP}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-32 mr-[52%] dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col items-center justify-between mb-2 max-md:flex-row max-md::justify-start">
                  <label
                    htmlFor="edadPat_nacP"
                    className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Edad Paterna cuando nació el propósito:
                  </label>
                  <Field
                    type="number"
                    id="edadPat_nacP"
                    name="edadPat_nacP"
                    placeholder="años..."
                    value={values?.edadPat_nacP}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-32 mr-[52%] dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
                    disabled={!isCreate && !editando}
                  />
                </div>
                <div className="flex flex-col items-center justify-between mb-2 max-md:flex-row max-md:justify-start">
                  <label
                    htmlFor="edadAbuela_nacM"
                    className="mr-2 text-base max-xl:text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    Edad de la Abuela cuando nació la madre:
                  </label>
                  <Field
                    type="number"
                    id="edadAbuela_nacM"
                    name="edadAbuela_nacM"
                    placeholder="años..."
                    value={values?.edadAbuela_nacM}
                    className="p-2 text-base max-xl:text-sm text-zinc-700 shadow appearance-none border border-gray-300 bg-stone-200 rounded-lg w-32 mr-[52%] dark:bg-slate-800 dark:text-gray-400 dark:border-slate-600 max-xl:mr-10"
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
      {datos === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-bold text-lg">
            Antecedentes Familiares
          </h4>
          <hr className="mb-3 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200 max-w-lg" />
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

export default AntecedenteFForm;
