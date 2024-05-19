import React from "react";

const ExamenNeuro = ({ exNeurologico }) => {
  if (!exNeurologico) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    facies: "Facies:",
    motricidad: "Motricidad:",
    sencibilidad: "Sencibilidad:",
    coordinacion: "Coordinación:",
    movInvo: "Movimientos involuntarios:",
    equilibrio: "Equilibrio:",
    lenguaje: "Lenguaje:",
    reflejos: "Reflejos:",
    paresCra: "Pares craneales:",
    maniNeurovege: "Manifestaciones Neurovegetativas:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(exNeurologico).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }

          const displayName = keyMappings[key] || key;

          return (
            <div key={key} className={`w-full mb-2 text-base`}>
              <span className="font-semibold dark:text-gray-300">
                {displayName}{" "}
              </span>{" "}
              {exNeurologico[key] || "sin dato..."}
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default ExamenNeuro;
