import React from "react";

const Musculatura = ({ musculatura }) => {
  if (!musculatura) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    normotrofica: "Normotrófica:",
    hipotrofica: "Hipotrófica:",
    hipertrofica: "Hipertrófica:",
    normotonica: "Normotónica::",
    hipotonica: "Hipotónica:",
    hipertonica: "Hipertónica:",
    fuerzaMus: "Fuerza muscular:",
    agenesia: "Agenesia muscular congénita:",
    agenesiaEspeci: "Especificar Agenesia:",
    obs: "Obs:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(musculatura).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP =
            key === "obs" || key === "agenesiaEspeci" ? true : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "fuerzaMus" || key === "agenesiaEspeci" || key === "obs" ? (
              musculatura[key] || "sin dato..."
            ) : musculatura[key] !== null ? (
              musculatura[key] ? (
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

export default Musculatura;
