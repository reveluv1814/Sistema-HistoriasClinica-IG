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
const AbdomenPDF = ({ abdomen }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>11. Abdomen</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Hernia umbilical: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                abdomen.herniaUmbilical === null || !abdomen.herniaUmbilical
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
          <Text style={{ fontWeight: 700 }}>Hernia inguinal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                abdomen.herniaInguinal === null || !abdomen.herniaInguinal
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
          <Text style={{ fontWeight: 700 }}>Diástasis de los rectos: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                abdomen.diastasis === null || !abdomen.diastasis
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.textApartado,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text style={{ fontWeight: 700 }}>Tumoraciones palpables: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              abdomen.tumoraciones === null || !abdomen.tumoraciones
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Semiología: </Text>
        {abdomen.semiologia || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {abdomen.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default AbdomenPDF;
