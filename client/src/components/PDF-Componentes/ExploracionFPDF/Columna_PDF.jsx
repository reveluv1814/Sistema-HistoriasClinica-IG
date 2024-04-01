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
const ColumnaPDF = ({ columna }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>10. Columna</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Cifosis: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                columna.cifosis === null || !columna.cifosis
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
          <Text style={{ fontWeight: 700 }}>Escoliosis: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                columna.escoliosis === null || !columna.escoliosis
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
          <Text style={{ fontWeight: 700 }}>Lordosis: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                columna.lordosis === null || !columna.lordosis
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={[styles.filaApartado, { width: "59%" }]}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Apéndice presacral: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                columna.apendice === null || !columna.apendice
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
          <Text style={{ fontWeight: 700 }}>Fóvea Coccigea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                columna.fovea === null || !columna.fovea
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {columna.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default ColumnaPDF;
