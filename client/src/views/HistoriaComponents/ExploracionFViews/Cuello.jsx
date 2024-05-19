import React from "react";

const Cuello = ({ cuello }) => {
  if (!cuello) {
    return null; // Manejo de caso si cuello es null o undefined
  }
  const keyMappings = {
    corto: "Corto:",
    quistes: "Quistes:",
    fistula: "Fístula:",
    colli: "Pterigium colli:",
    torticolis: "Tortícolis congénita:",
    tiroides: "Tiroides:",
    obs: "Obs",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(cuello).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "obs" ? true : false;

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "obs" ? (
              cuello[key] || "sin dato..."
            ) : cuello[key] !== null ? (
              cuello[key] ? (
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

export default Cuello;
