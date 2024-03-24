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
  sectionApartado: {
    margin: 2,
    padding: 5,
    fontFamily: "Opensans",
  },
  textApartado: {
    fontSize: 9,
    marginBottom: 4,
    textTransform: "capitalize",
    fontFamily: "Opensans",
  },
  textSubApartado: {
    fontSize: 10,
    textTransform: "capitalize",
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginTop: 3,
  },
  filaApartado: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "2px",
  },
  checkbox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  unchecked: {
    backgroundColor: "white",
  },
  checked: {
    backgroundColor: "black",
    width: 4,
    height: 5,
  },
});

const AntecedentesPPDF = ({ antecedenteP }) => {
  const fechaFormateada = (fechaProp) => {
    if (fechaProp === null) return null;
    const fecha = new Date(fechaProp);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getUTCFullYear();

    return `${dia}/${mes}/${año}`;
  };
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>1. Gestación</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Gesta: </Text>
          {antecedenteP.g_embarazo || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Obs.: </Text>
          {antecedenteP.g_obs || "sin dato..."}
        </Text>
      </View>
      <Text style={styles.textSubApartado}>2. Patologías en el embarazo</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Fiebre: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_fiebre === null || !antecedenteP.pat_fiebre
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Enf. Infec.: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_enfInfec === null || !antecedenteP.pat_enfInfec
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Diabetes: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_diabetes === null || !antecedenteP.pat_diabetes
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Epilepsia: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_epilepsia === null ||
                !antecedenteP.pat_epilepsia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Otras enfermedades crónicas: </Text>
          {antecedenteP.pat_otras || "sin dato..."}
        </Text>
      </View>
      <Text style={styles.textSubApartado}>
        3. Factores físicos durante el embarazo
      </Text>
      <Text style={styles.textSubApartado}>
        4. Factores químicos durante la gestación
      </Text>
      <Text style={styles.textSubApartado}>
        5. Observaciones durante la gestación
      </Text>
      <Text style={styles.textSubApartado}>6. Parto</Text>
      <Text style={styles.textSubApartado}>7. Datos del nacimiento</Text>
      <Text style={styles.textSubApartado}>Otras alteraciones</Text>
    </View>
  );
};

export default AntecedentesPPDF;
