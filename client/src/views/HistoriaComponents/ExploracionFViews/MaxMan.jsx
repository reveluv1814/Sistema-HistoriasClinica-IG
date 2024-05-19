import React from "react";

const MaxMan = ({ maxMandibula }) => {
  if (!maxMandibula) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    hipoplasiaMaxS: "Hipoplasia maxilar sup.:",
    micrognatia: "Micrognatia:",
    prognatismo: "Prognatismo:",
    retronagtismo: "Retronagtismo:",
    obs: "Obs:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(maxMandibula).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "obs" ? true : false;

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "obs" ? (
              maxMandibula[key] || "sin dato..."
            ) : maxMandibula[key] !== null ? (
              maxMandibula[key] ? (
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

export default MaxMan;
