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
const NarizPDF = ({ nariz }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>5. Nariz</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Puente nasal bajo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                nariz.puentenasal === null || !nariz.puentenasal
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Estenosis de coanas: </Text>
          {nariz.stenosis || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Desviación del Tabique: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                nariz.tabique === null || !nariz.tabique
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
          <Text style={{ fontWeight: 700 }}>Hipoplasia alar: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                nariz.hipoplasis === null || !nariz.hipoplasis
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
          <Text style={{ fontWeight: 700 }}>Nariz prominente: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                nariz.narizProminente === null || !nariz.narizProminente
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Tipo de nariz: </Text>
        {nariz.tipoNariz || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {nariz.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default NarizPDF;
