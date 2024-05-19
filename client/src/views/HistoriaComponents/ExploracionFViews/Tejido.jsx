import React from "react";

const Tejido = ({ tejidoSub }) => {
  if (!tejidoSub) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    espesor: "Espesor:",
    turgor: "Turgor:",
    edemaManos: "Manos:",
    edemaPies: "Pies:",
    edemaOtros: "Otros:",
    ganglios: "Gánglios:",
    obs: "Obs.",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(tejidoSub).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP =
            key === "edemaOtros"|| key === "turgor" || key === "ganglios" || key === "obs"
              ? true
              : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "espesor" ||
            key === "turgor" ||
            key === "edemaOtros" ||
            key === "ganglios" ||
            key === "obs" ? (
              tejidoSub[key] || "sin dato..."
            ) : tejidoSub[key] !== null ? (
              tejidoSub[key] ? (
                <span className="font-semibold text-emerald-800 bg-gray-300 px-1">
                  ✓
                </span>
              ) : (
                <span className="font-semibold text-rose-800 bg-gray-300 px-1">
                  ✗
                </span>
              )
            ) : (
              "sin dato..."
            );
          const apartado =
            key === "turgor" ? (
              <p className="font-semibold mt-2 text-indigo-500 dark:text-indigo-600">
                Edema:
              </p>
            ) : (
              ""
            );

          return (
            <div
              key={key}
              className={`w-full ${
                styleP ? "" : "md:w-1/2 lg:w-1/3"
              } mb-2 text-base`}
            >
              <span className="font-semibold dark:text-gray-300">
                {displayName}{" "}
              </span>{" "}
              {renderContent}
              {apartado}
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default Tejido;
