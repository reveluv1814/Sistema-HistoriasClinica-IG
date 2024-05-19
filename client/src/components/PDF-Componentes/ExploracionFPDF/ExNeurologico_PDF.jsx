import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  sectionApartado: {
    fontFamily: "Opensans",
  },
  textApartado: {
    fontSize: 9,
    marginBottom: 2,
    fontFamily: "Opensans",
  },
  textSubApartado: {
    fontSize: 10,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
  },
});
const ExNeurologicoPDF = ({ exNeurologico }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>17. Exámen Neurológico</Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Facies: </Text>
        {exNeurologico.facies || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Motricidad: </Text>
        {exNeurologico.motricidad || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Sencibilidad: </Text>
        {exNeurologico.sencibilidad || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Coordinación: </Text>
        {exNeurologico.coordinacion || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Movimientos involuntarios: </Text>
        {exNeurologico.movInvo || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Equilibrio: </Text>
        {exNeurologico.equilibrio || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Lenguaje: </Text>
        {exNeurologico.lenguaje || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Reflejos: </Text>
        {exNeurologico.reflejos || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Pares craneales: </Text>
        {exNeurologico.paresCra || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>
          Manifestaciones Neurovegetativas:{" "}
        </Text>
        {exNeurologico.maniNeurovege || "sin dato..."}
      </Text>
    </View>
  );
};

export default ExNeurologicoPDF;
