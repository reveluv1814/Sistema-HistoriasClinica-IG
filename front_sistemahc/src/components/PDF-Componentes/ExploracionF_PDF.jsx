import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CraneoFPDF from "./ExploracionFPDF/CraneoF_PDF";
import OrejasPDF from "./ExploracionFPDF/Orejas_PDF";
import OjosPDF from "./ExploracionFPDF/Ojos_PDF";
import NarizPDF from "./ExploracionFPDF/Nariz_PDF";

const styles = StyleSheet.create({
  sectionApartado: {
    margin: 2,
    padding: 5,
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
  hr: {
    borderBottomColor: "#344955",
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  filaApartado: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "0px",
  },
});

const ExploracionFPDF = ({ exploracionF }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>1. Examen Físico General</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Peso: </Text>
          {exploracionF.peso || "-"} gr. /{" "}
          {exploracionF.peso_porcentaje || "- "}%
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Talla: </Text>
          {exploracionF.talla || "-"} cm. /{" "}
          {exploracionF.talla_porcentaje || "- "}%
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>PC: </Text>
          {exploracionF.pc || "-"} cm. / {exploracionF.pc_porcentaje || "- "}%
        </Text>
      </View>

      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>PT: </Text>
          {exploracionF.pt || "-"} cm. / {exploracionF.pt_porcentaje || "- "}%
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Envergadura: </Text>
          {exploracionF.envergadura || "-"} cm.
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>DII: </Text>
          {exploracionF.dii || "-"} mm. / {exploracionF.dii_porcentaje || "- "}%
        </Text>
      </View>

      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Seg. Sup: </Text>
          {exploracionF.seg_sup || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Seg. Inf: </Text>
          {exploracionF.seg_inf || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Distancia intermamilar: </Text>
          {exploracionF.distancia_inter || "-"}
        </Text>
      </View>

      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Bregma: </Text>
          {exploracionF.bregma || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Largo de mano D: </Text>
          {exploracionF.largo_manoD || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Largo dedo medio D: </Text>
          {exploracionF.largo_dedoMD || "-"}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>
            Distancia intercantal interna:{" "}
          </Text>
          {exploracionF.distancia_intercantal || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Largo de mano I: </Text>
          {exploracionF.largo_manoI || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Largo dedo medio I: </Text>
          {exploracionF.largo_dedoMI || "-"}
        </Text>
      </View>

      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Oreja D: </Text>
          {exploracionF.orejaD || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Oreja I: </Text>
          {exploracionF.orejaI || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Pie D: </Text>
          {exploracionF.pieD || "-"}
        </Text>
      </View>

      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: "bold" }}>Pie I: </Text>
          {exploracionF.pieI || "-"}
        </Text>
      </View>
      <View style={styles.hr} />
      {exploracionF.craneoF !== null ? (
        <CraneoFPDF craneoF={exploracionF.craneoF} />
      ) : (
        <Text style={styles.textApartado}>sin datos...</Text>
      )}
      <View style={styles.hr} />
      {exploracionF.orejas !== null ? (
        <OrejasPDF orejas={exploracionF.orejas} />
      ) : (
        <Text style={styles.textApartado}>sin datos...</Text>
      )}
      <View style={styles.hr} />
      {exploracionF.ojos !== null ? (
        <OjosPDF ojos={exploracionF.ojos} />
      ) : (
        <Text style={styles.textApartado}>sin datos...</Text>
      )}
      <View style={styles.hr} />
      {exploracionF.nariz !== null ? (
        <NarizPDF nariz={exploracionF.nariz} />
      ) : (
        <Text style={styles.textApartado}>sin datos...</Text>
      )}
      <View style={styles.hr} />
    </View>
  );
};

export default ExploracionFPDF;
