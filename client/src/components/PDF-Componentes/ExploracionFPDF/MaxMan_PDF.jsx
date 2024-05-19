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

const MaxManPDF = ({ maxMandibula }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>6. Maxilar y Mandíbula</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Hipoplasia maxilar sup.: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                maxMandibula.hipoplasiaMaxS === null ||
                !maxMandibula.hipoplasiaMaxS
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
          <Text style={{ fontWeight: 700 }}>Micrognatia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                maxMandibula.micrognatia === null || !maxMandibula.micrognatia
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
          <Text style={{ fontWeight: 700 }}>Prognatismo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                maxMandibula.prognatismo === null || !maxMandibula.prognatismo
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
        <Text style={{ fontWeight: 700 }}>Retronagtismo: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              maxMandibula.retronagtismo === null || !maxMandibula.retronagtismo
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {maxMandibula.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default MaxManPDF;
