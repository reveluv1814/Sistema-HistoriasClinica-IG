import React from "react";

const CraneoF = ({ craneoF }) => {
  if (!craneoF) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    microcefalia: "Microcefalia:",
    macrocefalia: "Macrocefalia:",
    hidrocefalia: "Hidrocefalia:",
    craneossino: "Cráneosinostosis:",
    occipital_p: "Occipital plano:",
    prominente: "Occipital prominente:",
    abultamiento_f: "Abultamiento frontal:",
    glabela_p: "Glabela prominente:",
    asimetria_c: "Asimetría craneal:",
    braquicefalia: "Braquicefalia:",
    aplasia_cuero: "Áreas de aplasia de cuero cabelludo:",
    implantación_cabello: "Implantación de cabellos:",
    hipoplasia: "Hipoplasia malar:",
    suturas: "Suturas:",
    suturas_des: "Suturas descripción:",
    facies: "Fácies:",
    obs: "Obs:",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(craneoF).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const stylePCraneo =
            key === "suturas_des" || key === "facies" || key === "obs"
              ? true
              : false;

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "implantación_cabello" ||
            key === "suturas_des" ||
            key === "facies" ||
            key === "obs" ? (
              craneoF[key] || "sin dato..."
            ) : craneoF[key] !== null ? (
              craneoF[key] ? (
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
                stylePCraneo ? "" : "md:w-1/2 lg:w-1/3"
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

export default CraneoF;
