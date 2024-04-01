import React from "react";

const Torax = ({ torax }) => {
  if (!torax) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    cajaPequeña: "Caja toraxica pequeña:",
    esternonCorto: "Esternon corto:",
    escavado: "Escavado:",
    quilla: "En Quilla:",
    mamasAnormales: "Mamas-anormales:",
    politelia: "Politelia:",
    defectosCostales: "Defectos-costales:",
    obs: "Obs:",
    pulmones: "Pulmones:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(torax).map((key) => {
          if (
            key === "id" ||
            key === "createdAt" ||
            key === "cardioTa" ||
            key === "cardioTaSobre" ||
            key === "cardioFc" ||
            key === "cardioBM"
          ) {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "obs" || key === "pulmones" ? true : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "pulmones" || key === "obs" ? (
              torax[key] || "sin dato..."
            ) : torax[key] !== null ? (
              torax[key] ? (
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

          return (
            <p
              key={key}
              className={`w-full ${
                styleP ? "" : "md:w-1/2 lg:w-1/3"
              } mb-2 text-base`}
            >
              <span className="font-semibold dark:text-gray-300">
                {displayName}{" "}
              </span>{" "}
              {renderContent}
            </p>
          );
        })}
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Cardio - Circulatorio TA:
          </span>{" "}
          {torax.cardioTa || "-"}
          {" / "}
          {torax.cardioTaSobre || "- "}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">FC:</span>{" "}
          {torax.cardioFc || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">b.m.:</span>{" "}
          {torax.cardioBM || "sin dato..."}
        </p>
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default Torax;
