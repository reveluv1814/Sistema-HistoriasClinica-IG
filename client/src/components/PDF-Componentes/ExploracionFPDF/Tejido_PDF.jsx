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
  textoDescripcion: {
    fontSize: 9,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
  },
  textSubApartado: {
    fontSize: 10,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
  },
  filaApartado: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "0px",
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
const TejidoPDF = ({ tejidoSub }) => {
  //     espesor: "Espesor:",
  //     turgor: "Turgor:",
  //     edemaManos: "Manos:",
  //     edemaPies: "Pies:",
  //     edemaOtros: "Otros:",
  //     ganglios: "Gánglios:",
  //     obs: "Obs.",

  //     espesor: { allowNull: true, type: DataTypes.STRING },
  //   turgor: { allowNull: true, type: DataTypes.STRING },
  //   edemaManos: { allowNull: true, type: DataTypes.BOOLEAN },
  //   edemaPies: { allowNull: true, type: DataTypes.BOOLEAN },
  //   edemaOtros: { allowNull: true, type: DataTypes.STRING },
  //   ganglios: { allowNull: true, type: DataTypes.STRING },
  //   obs: { allowNull: true, type: DataTypes.STRING },
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>14. Tejido Celular Subcutáneo</Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Espesor: </Text>
        {tejidoSub.espesor || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Turgor: </Text>
        {tejidoSub.turgor || "sin dato..."}
      </Text>
      <Text style={styles.textoDescripcion}>Edema:</Text>
      <View style={[styles.filaApartado, { width: "60%" }]}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Manos: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                tejidoSub.edemaManos === null || !tejidoSub.edemaManos
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
          <Text style={{ fontWeight: 700 }}>Pies: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                tejidoSub.edemaPies === null || !tejidoSub.edemaPies
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Otros: </Text>
        {tejidoSub.edemaOtros || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Gánglios: </Text>
        {tejidoSub.ganglios || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {tejidoSub.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default TejidoPDF;
