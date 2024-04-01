import React from "react";

const Abdomen = ({ abdomen }) => {
  if (!abdomen) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    herniaUmbilical: "Hernia umbilical:",
    herniaInguinal: "Hernia inguinal:",
    diastasis: "Diástasis de los rectos:",
    tumoraciones: "Tumoraciones palpables:",
    semiologia: "Semiología:",
    obs: "Obs:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(abdomen).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "obs" || key === "semiologia" ? true : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "semiologia" || key === "obs" ? (
              abdomen[key] || "sin dato..."
            ) : abdomen[key] !== null ? (
              abdomen[key] ? (
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
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default Abdomen;
