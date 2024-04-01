import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSBold from "../../font/OpenSans_Condensed-Bold.ttf";
import OpenS from "../../font/OpenSans-Regular.ttf";

Font.register({
  family: "Opensans",
  fonts: [
    { src: OpenS, fontWeight: 400 },
    { src: OpenSBold, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  sectionFiliacion: {
    margin: 2,
    padding: 5,
    fontFamily: "Opensans",
  },
  textFiliacion: {
    fontSize: 9,
    marginBottom: 4,
    textTransform: "capitalize",
    fontFamily: "Opensans",
  },
  filaFiliacion: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "2px",
  },
});

const FiliacionPDF = ({ paciente }) => {
  const formatDate = (date) => {
    if (!date) return "Sin fecha";
    return date;
  };
  const fecha = new Date(paciente.fechanac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getUTCFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`;

  return (
    <View style={styles.sectionFiliacion}>
      <View style={styles.filaFiliacion}>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Nombre: </Text>
          {`${paciente?.persona?.nombre} ${paciente?.persona?.apellidoPaterno} ${paciente?.persona?.apellidoMaterno}`}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Fecha de nacimiento: </Text>
          {formatDate(fechaFormateada)}
        </Text>
      </View>
      <View style={styles.filaFiliacion}>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>CI: </Text>
          {paciente?.persona?.ci || ""}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Edad: </Text>
          {paciente?.edad || ""}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Sexo: </Text>
          {paciente?.sexo || ""}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Raza: </Text>
          {paciente?.raza || ""}
        </Text>
      </View>
      <View style={styles.filaFiliacion}>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Procedencia: </Text>
          {paciente?.procedencia || ""}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Residencia: </Text>
          {paciente?.residencia || ""}
        </Text>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Teléfono: </Text>
          {paciente?.persona?.telefono || ""}
        </Text>
      </View>
      <View style={styles.filaFiliacion}>
        <Text style={styles.textFiliacion}>
          <Text style={{ fontWeight: 700 }}>Dirección: </Text>
          {paciente?.persona?.direccion || ""}
        </Text>
      </View>
    </View>
  );
};

export default FiliacionPDF;
