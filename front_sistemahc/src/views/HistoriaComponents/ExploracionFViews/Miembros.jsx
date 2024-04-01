import React from "react";

const Miembros = ({ miembros }) => {
  if (!miembros) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    supManosP: "Manos Pequeñas:",
    supBraquiactilia: "Braquidactilia:",
    supAracnodactilia: "Aracnodactilia:",
    supPolidactilia: "Polidactilia:",
    supTipoPoli: "Tipo de polidactilia:",
    supSindactilia: "Sindactilia:",
    supCutanea: "Cutánea:",
    supOsea: "Ósea:",
    supDedos: "Dedos:",
    supPliegueSimeano: "Simeano:",
    supPliegueCompleto: "Completo:",
    supPliegueImcompleto: "Imcompleto:",
    supPliegueQuinto: "Pliegue único en el 5º dedo:",
    supHipoplasia: "Hipoplasia de la 2º falange del 5º dedo:",
    supClinodactilia: "Clinodactilia:",
    supEspDedos: "Dedo(s):",
    supCavalgamiento: "Cavalgamiento de dedo(s):",
    supDeformidad: "Deformidad por acortamiento del miembro superior:",
    supObs: "Obs:",
    infPiePeque: "Pies pequeños:",
    infPolidactilia: "Polidactilia:",
    infImplantacion: "Implantación de dedo(s) extra(s):",
    infSindactilia: "Sindactila:",
    infCutanea: "Cutánea:",
    infOsea: "Ósea:",
    infDedos: "Dedos:",
    infCavo: "Cavo:",
    infCalcaneo: "Calcáneo:",
    infEquino: "Equino:",
    infVaro: "Varo:",
    infValgo: "Valgo:",
    infPiePlano: "Pie plano:",
    infDistancia:
      "Distancia aumentada entre halux y 2º dedo Deformidad por reducción del miembro inferior:",
    infObs: "Obs:",
    artiLimitaciones: "Limitación de movimientos:",
    artiHiperex: "Hiperextensibilidad articular:",
    artiContracion:
      "Contracción generalizada por flexion de las articulaciones de miembros - luxación congénita, Especificado:",
  };

  return (
    <>
      <h3 className="text-base font-semibold mb-1 w-full text-indigo-500 dark:text-indigo-600">
        A. Miembros Superiores
      </h3>
      <div className="flex flex-row flex-wrap">
        {Object.keys(miembros).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP =
            key === "supTipoPoli" ||
            key === "supDedos" ||
            key === "supCavalgamiento" ||
            key === "supObs" ||
            key === "infImplantacion" ||
            key === "infDedos" ||
            key === "supEspDedos" ||
            key === "infObs" ||
            key === "artiLimitaciones" ||
            key === "artiHiperex" ||
            key === "artiContracion" ||
            key === "supDeformidad" ||
            key === "infDistancia"
              ? true
              : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "supTipoPoli" ||
            key === "supDedos" ||
            key === "supCavalgamiento" ||
            key === "supObs" ||
            key === "infImplantacion" ||
            key === "infDedos" ||
            key === "supEspDedos" ||
            key === "infObs" ||
            key === "artiLimitaciones" ||
            key === "artiHiperex" ||
            key === "artiContracion" ? (
              miembros[key] || "sin dato..."
            ) : miembros[key] !== null ? (
              miembros[key] ? (
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

          //renderiza los apartados
          const renderApartados =
            key === "supObs" ? (
              <>
                <hr className="mb-2 border-0 h-px  bg-sky-300  shadow w-full dark:bg-sky-600" />
                <h3 className="text-base font-semibold mb-1 w-full text-indigo-500 dark:text-indigo-600">
                  B. Miembros Inferiores
                </h3>
              </>
            ) : key === "infObs" ? (
              <>
                <hr className="mb-2 border-0 h-px  bg-sky-300  shadow w-full dark:bg-sky-600" />
                <h3 className="text-base font-semibold mb-1 w-full text-indigo-500 dark:text-indigo-600">
                  C. Articulaciones
                </h3>
              </>
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
              {renderApartados}
              {key === "supDedos" && (
                <h3 className="text-base font-semibold mt-2 w-full text-indigo-500 dark:text-indigo-600">
                  Pliegue:
                </h3>
              )}
              {key === "infDedos" && (
                <h3 className="text-base font-semibold mt-2 w-full text-indigo-500 dark:text-indigo-600">
                  Alt. congénita:
                </h3>
              )}
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default Miembros;
