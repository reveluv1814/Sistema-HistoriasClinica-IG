import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ButtonPDF = ({ historiaData }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PDF historiaData={historiaData} />}
        fileName={`${
          !historiaData.paciente.persona.nombre
            ? "paciente-"
            : historiaData.paciente.persona.nombre +
              "-" +
              (historiaData.paciente.persona.apellidoPaterno
                ? historiaData.paciente.persona.apellidoPaterno + "-"
                : "")
        }historiaClinica.pdf`}
      >
        {({ loading, url }) => (
          <button
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 text-white"
                : "bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600"
            } flex justify-center items-center gap-2 text-white font-bold py-2 px-4 rounded hover:opacity-100 focus:outline-none focus:shadow-outline`}
          >
            {!loading && (
              <img src="/pdf.svg" alt="Download" className="w-8 h-8" />
            )}
            {loading ? "Cargando documento..." : "Descargar ahora"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ButtonPDF;
