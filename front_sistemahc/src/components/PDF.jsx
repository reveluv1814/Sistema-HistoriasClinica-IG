import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import ig from "/ig.png";
import FiliacionPDF from "./PDF-Componentes/FIliaciónPdf";
import OpenSBold from "./../font/OpenSans_Condensed-Bold.ttf";
import OpenS from "./../font/OpenSans-Regular.ttf";
import AntecedentesFPDF from "./PDF-Componentes/AntecedentesF_PDF";
import AntecedentesPPDF from "./PDF-Componentes/AntecedentesP_PDF";

Font.register({
  family: "Opensans",
  fonts: [
    { src: OpenS, fontWeight: 400 },
    { src: OpenSBold, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Opensans",
    fontSize: 12,
    flexDirection: "column",
    paddingTop: "1.54cm", // Margen superior
    paddingBottom: "2.54cm", // Margen inferior
    paddingLeft: "2.54cm", // Margen izquierdo
    paddingRight: "2.54cm", // Margen derecho
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textContainer: {
    flex: 2,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: "center",
    marginVertical: 10,
  },
  textCabecera: {
    fontSize: 8,
    fontWeight: 700,
    lineHeight: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 1,
  },
  sectionHr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: "1cm",
    left: "15%",
    right: 0,
    textAlign: "center",
    width: "100%",
    fontWeight: 400,
  },
});

const PDF = ({ historiaData }) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textCabecera}>
              UNIVERSIDAD MAYOR DE SAN ANDRÉS
            </Text>
            <Text style={styles.textCabecera}>
              FACULTAD DE MEDICINA, ENFERMERÍA, NUTRICIÓN Y TECNOLOGÍA MÉDICA
            </Text>
            <Text style={styles.textCabecera}>INSTITUTO DE GENÉTICA</Text>
          </View>
          <Image src={ig} style={styles.logo} />
        </View>
        <View style={styles.hr} />
        <Text style={styles.title}>Historia Clínica</Text>
        <View>
          <Text style={styles.subTitle}>I. Filiación</Text>
          <FiliacionPDF paciente={historiaData.paciente} />
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>II. Antecedentes Familiares</Text>
          <AntecedentesFPDF antecedenteF={historiaData.antecedenteF} />
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>III. Antecedentes Personales</Text>
          <AntecedentesPPDF antecedenteP={historiaData.antecedenteP} />
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>IV. Composición de la Familia</Text>
          {/* Datos omitidos... */}
          <Text>hola</Text>
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>V. Árbol Genealógico</Text>
          {/* Imagen omitida... */}
          <Text>hola</Text>
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>VI. Exploración Física</Text>
          {/* Tablas omitidas... */}
          <Text>hola</Text>
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>
            VII. Resumen de Consultas Realizadas
          </Text>
          {/* Tabla omitida... */}
          <Text>hola</Text>
          <View style={styles.sectionHr} />
          <Text style={styles.subTitle}>VIII. Exámenes de Laboratorio</Text>
          {/* Tabla omitida... */}
          <Text>hola</Text>
          <View style={styles.sectionHr} />
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDF;
