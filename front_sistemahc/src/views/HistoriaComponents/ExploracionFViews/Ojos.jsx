import React from "react";

const Ojos = ({ ojos }) => {
  if (!ojos) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    sinofiris: "Sinofiris:",
    ptosis_p: "Ptosis parpebral:",
    estrabismo: "Estrabismo:",
    convergente: "Convergente:",
    divergente: "Divergente:",
    infeccion: "Infección:",
    epifora: "Epífora:",
    anoftalmina: "Anoftalmina:",
    microftalmina: "Microftalmina:",
    hipertelorismo: "Hipertelorismo:",
    epicanto: "Epicanto:",
    angulo_oblicuos: "Ángulos parpebrales oblicuos:",
    exoftalmina: "Exoftalmina:",
    nistagmus: "Nistagmus:",
    escleras_azul: "Escleras azules:",
    coloboma: "Coloboma:",
    aniridia: "Aniridia:",
    maculas_iris: "Máculas en iris:",
    catarata: "Catarata:",
    leucoma: "Leucoma:",
    obs: "Obs:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(ojos).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "obs" ? true : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "angulo_oblicuos" || key === "obs" ? (
              ojos[key] || "sin dato..."
            ) : ojos[key] !== null ? (
              ojos[key] ? (
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
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default Ojos;
