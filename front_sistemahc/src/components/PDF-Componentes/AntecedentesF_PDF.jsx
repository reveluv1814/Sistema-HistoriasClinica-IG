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
  sectionAntecedentesFamiliares: {
    margin: 2,
    padding: 5,
    fontFamily: "Opensans",
  },
  textAntecedentesFamiliares: {
    fontSize: 9,
    marginBottom: 4,
    textTransform: "capitalize",
    fontFamily: "Opensans",
  },
  filaAntecedentesFamiliares: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "2px",
  },
});

const AntecedentesFPDF = ({ antecedenteF }) => {
  const fechaFormateada = (fechaProp) => {
    if (fechaProp === null) return null;
    const fecha = new Date(fechaProp);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getUTCFullYear();

    return `${dia}/${mes}/${año}`;
  };
  return (
    <View style={styles.sectionAntecedentesFamiliares}>
      <View style={styles.filaAntecedentesFamiliares}>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Padre: </Text>
          {antecedenteF.nomPadre || ""}
        </Text>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Fecha nac.: </Text>
          {fechaFormateada(antecedenteF.fechaNac_Padre) || "sin dato..."}
        </Text>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Profesión : </Text>
          {antecedenteF.profesionPadre || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaAntecedentesFamiliares}>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Madre: </Text>
          {antecedenteF.nomMadre || "sin dato..."}
        </Text>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Fecha Nac.: </Text>
          {fechaFormateada(antecedenteF.fechaNac_Madre) || "sin dato..."}
        </Text>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>Profesión : </Text>
          {antecedenteF.profesionMadre || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaAntecedentesFamiliares}>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>
            Edad materna cuando nació el proposito:{" "}
          </Text>
          {antecedenteF.edadMat_nacP || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaAntecedentesFamiliares}>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>
            Edad paterna cuando nació el proposito:{" "}
          </Text>
          {antecedenteF.edadPat_nacP || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaAntecedentesFamiliares}>
        <Text style={styles.textAntecedentesFamiliares}>
          <Text style={{ fontWeight: 700 }}>
            Edad de la abuela cuando nació la madre:{" "}
          </Text>
          {antecedenteF.edadPat_nacP || "sin dato..."}
        </Text>
      </View>
    </View>
  );
};

export default AntecedentesFPDF;
