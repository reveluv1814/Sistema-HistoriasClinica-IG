import React from "react";

const LaboratorioView = ({ laboratoristas }) => {
  const fechaFormateada = (fechaProp) => {
    if (fechaProp === null) return null;
    const fecha = new Date(fechaProp);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getUTCFullYear();

    return `${dia}/${mes}/${año}`;
  };
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-700 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1 dark:text-gray-300">
              Exámenes de Laboratorio
            </h2>
            <hr
              className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800"
              style={{ width: "100%" }}
            />
            <div className="flex flex-row flex-wrap">
              {laboratoristas.length === 0 ? (
                <span className="text-xl italic font-medium">
                  Sin datos ...
                </span>
              ) : (
                laboratoristas.map((labHistoria, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full bg-indigo-100 dark:bg-indigo-800 shadow-md rounded-md p-3  mb-4"
                    >
                      <div className="text-sm">
                        <p className="w-full mb-1">
                          <span className="font-semibold">Exámen: </span>
                          {labHistoria.historiaLabo.examen || "sin dato..."}
                        </p>
                        <p className="w-full md:w-1/2 lg:w-1/3 mb-3">
                          <span className="font-semibold">
                            Fecha de creación:{" "}
                          </span>
                          {fechaFormateada(labHistoria.historiaLabo.createdAt)}
                        </p>

                        <p className="w-full italic">
                          <span className="font-semibold">Laboratorista: </span>
                          {labHistoria.laboratorista.persona.nombreCompleto}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaboratorioView;
