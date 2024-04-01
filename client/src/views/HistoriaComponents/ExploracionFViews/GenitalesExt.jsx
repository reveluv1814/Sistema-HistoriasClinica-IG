import React from "react";

const GenitalesExt = ({ genitalesEx }) => {
  if (!genitalesEx) {
    return null; // Manejo de caso si craneoF es null o undefined
  }
  const keyMappings = {
    tanner: "Tanner:",
    ambiguos: "Anmbiguos:",
    criptorquidea: "Criptorquidea:",
    testiculoRetractil: "Testículo retráctil:",
    hipoMay: "Hipoplasia de Lab. May.:",
    hipoMen: "Hipo. Lab. Men.:",
    hipertrofiaClitoris: "Hipertrofia de clítoris:",
    hidrocele: "Hidrocele congénito:",
    meato: "Meato balanoprepucial:",
    peneal: "Peneal:",
    peneoescrotal: "Peneoescrotal:",
    perineal: "Perineal:",
    epispadia: "Epispadia:",
    fimosis: "Fimosis:",
    tamanioPene: "Tamaño del Pene (en cm):",
    testiculoDMay: "Testículo D (eje mayor):",
    testiculoIMay: "Testículo I (eje mayor):",
    testiculoDMen: "Testículo D (eje menor):",
    testiculoIMen: "Testículo I (eje menor):",
  };
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {Object.keys(genitalesEx).map((key) => {
          if (key === "id" || key === "createdAt") {
            return null; // Ignorar las claves "id" y "createdAt"
          }
          const styleP = key === "tanner" || key === "hidrocele" ? true : false; //aplica ancho al input segun el atributo

          const displayName = keyMappings[key] || key;

          const renderContent =
            key === "tanner" ||
            key === "tamanioPene" ||
            key === "testiculoDMay" ||
            key === "testiculoIMay" ||
            key === "testiculoDMen" ||
            key === "testiculoIMen" ? (
              genitalesEx[key] || "sin dato..."
            ) : genitalesEx[key] !== null ? (
              genitalesEx[key] ? (
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
          const apartado =
            key === "hidrocele" ? (
              <p className="font-semibold mt-1 text-indigo-500 dark:text-indigo-600 ">
                Hidospadia:
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
              {apartado}
            </div>
          );
        })}
      </div>
      <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
    </>
  );
};

export default GenitalesExt;
