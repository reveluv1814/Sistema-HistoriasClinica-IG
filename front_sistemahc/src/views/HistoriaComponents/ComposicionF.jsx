import React from "react";

const ComposicionFView = ({ composicionesF }) => {
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
              Composición de la Familia
            </h2>
            <hr
              className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800"
              style={{ width: "100%" }}
            />
            <div className="flex flex-row flex-wrap">
              {composicionesF.length === 0 ? (
                <span className="text-xl italic font-medium">
                  Sin datos ...
                </span>
              ) : (
                <>
                  <div className="overflow-x-auto bg-white dark:bg-neutral-700 rounded-md">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                      <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
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
                        </tr>
                      </thead>

                      <tbody>
                        {composicionesF.map((compF) => (
                          <tr
                            key={compF.id}
                            className="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600"
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
                              {fechaFormateada(compF.fechanac) || "sin dato"}
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              {compF.obs || "sin dato"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposicionFView;
