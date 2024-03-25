import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ButtonPDF = ({ historiaData }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PDF historiaData={historiaData} />}
        fileName="historiaClinica.pdf"
      >
        {({ loading, url }) =>
          loading ? (
            <button>Cargando documento...</button>
          ) : (
            <button>Descargar ahora</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ButtonPDF;
