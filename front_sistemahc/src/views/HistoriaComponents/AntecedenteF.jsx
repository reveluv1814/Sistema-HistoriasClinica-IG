import React from "react";

const AntecedenteFView = ({ antecedenteF }) => {
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-700 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1 dark:text-gray-300">
              Antecedentes Familiares
            </h2>
            <hr
              className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800"
              style={{ width: "100%" }}
            />
            <div className="flex flex-row flex-wrap">
              {antecedenteF == null ? (
                <span className="text-xl italic font-medium">
                  Sin datos ...
                </span>
              ) : (
                (() => {
                  const fecha = new Date(antecedenteF.createdAt);
                  const dia = fecha.getUTCDate().toString().padStart(2, "0");
                  const mes = (fecha.getUTCMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const año = fecha.getUTCFullYear();
                  const fechaFormateada = `${dia}/${mes}/${año}`;
                  return (
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row flex-wrap">
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">
                            Padre:
                          </span>{" "}
                          {antecedenteF.nomPadre || "sin dato..."}
                        </p>
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base">
                          <span className="font-semibold dark:text-gray-300">
                            Fecha Nac.:
                          </span>{" "}
                          {antecedenteF.fechaNac_Padre || "sin dato..."}
                        </p>
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">
                            Profesión:
                          </span>{" "}
                          {antecedenteF.profesionPadre || "sin dato..."}
                        </p>
                        <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">
                            Madre:
                          </span>{" "}
                          {antecedenteF.nomMadre || "sin dato..."}
                        </p>
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base">
                          <span className="font-semibold dark:text-gray-300">
                            Fecha Nac.:
                          </span>{" "}
                          {antecedenteF.fechaNac_Madre || "sin dato..."}
                        </p>
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">
                            Profesión:
                          </span>{" "}
                          {antecedenteF.profesionMadre || "sin dato..."}
                        </p>
                        <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                        <p className="w-full mb-2 text-base">
                          <span className="font-semibold w-full dark:text-gray-300">
                            Edad materna cuando nació el proposito:
                          </span>{" "}
                          {antecedenteF.edadMat_nacP || "sin dato..."}
                        </p>
                        <p className="w-full mb-2 text-base">
                          <span className="font-semibold w-full dark:text-gray-300">
                            Edad paterna cuando nació el proposito:
                          </span>{" "}
                          {antecedenteF.edadPat_nacP || "sin dato..."}
                        </p>
                        <p className="w-full  mb-2 text-base">
                          <span className="font-semibold dark:text-gray-300">
                            Edad de la abuela cuando nació la madre:
                          </span>{" "}
                          {antecedenteF.edadPat_nacP || "sin dato..."}
                        </p>
                        <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />

                        <p className="w-full  mb-2 text-base">
                          <span className="font-semibold dark:text-gray-300">
                            Última modificación:
                          </span>{" "}
                          {fechaFormateada || "sin dato..."}
                        </p>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AntecedenteFView;
