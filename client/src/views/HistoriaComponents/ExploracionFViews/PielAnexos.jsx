import React from "react";

const PielAnexos = ({ pielAnexos }) => {
  if (!pielAnexos) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    pigmentacion: "Normal:",
    aumentoGen: "Aumento generalizado:",
    disminucionGen: "Disminución generalizada:",
    albinTotal: "Total:",
    albinParcial: "Parcial:",
    vitiligo: "Vitíligo:",
    manchasCL: "Manchas café con leche:",
    maculas: "Máculas periorales:",
    otrasManchas: "Otras manchas:",
    hemanTela: "Hemangiomas y Telangieotasias:",
    alopesiaGen: "Generalizada:",
    alopesiaPar: "Parcial:",
    irsutismo: "Irsutismo:",
    hipoDisManos: "Uñas de manos:",
    hipoDisPies: "Pies:",
    hipoDisTumo: "Tumoraciones:",
    vellosFaciales: "Vellos faciales:",
    vellosAxilares: "Vellos axilares:",
    vellosPubi: "Vellos púbicos:",
    vellosCorpo: "Vellos corporales:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        <div className="font-semibold mt-1 mb-1 text-indigo-500 dark:text-indigo-600  w-full">
          Pigmentación cutánea:
        </div>
        {Object.keys(pielAnexos).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP =
            key === "irsutismo" ||
            key === "disminucionGen" ||
            key === "hemanTela" ||
            key === "vellosFaciales" ||
            key === "vellosAxilares" ||
            key === "vellosPubi" ||
            key === "vellosCorpo"
              ? true
              : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "vellosFaciales" ||
            key === "vellosAxilares" ||
            key === "vellosPubi" ||
            key === "vellosCorpo" ? (
              pielAnexos[key] || "sin dato..."
            ) : pielAnexos[key] !== null ? (
              pielAnexos[key] ? (
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
          const Apartado1 =
            key === "disminucionGen" ? (
              <p className="font-semibold mt-1 text-indigo-500 dark:text-indigo-600  w-full">
                Albinismo:
              </p>
            ) : (
              ""
            );
          const Apartado2 =
            key === "hemanTela" ? (
              <p
                key={key}
                className="font-semibold mt-1 text-indigo-500 dark:text-indigo-600  w-full"
              >
                Alopesía:
              </p>
            ) : (
              ""
            );
          const Apartado3 =
            key === "irsutismo" ? (
              <p
                key={key}
                className="font-semibold mt-1 text-indigo-500 dark:text-indigo-600  w-full"
              >
                Hipoplasia o displasia:
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
              {Apartado1}
              {Apartado2}
              {Apartado3}
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default PielAnexos;
