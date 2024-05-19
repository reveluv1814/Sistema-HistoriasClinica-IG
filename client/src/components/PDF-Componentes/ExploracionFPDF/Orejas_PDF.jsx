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
const OrejasPDF = ({ orejas }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>3. Orejas</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Implantación: </Text>
          {orejas.implantacion || "sin dato..."}
        </Text>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Microtia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.microtia === null || !orejas.microtia
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
          <Text style={{ fontWeight: 700 }}>Pabellón malformado: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.pabellon_mal === null || !orejas.pabellon_mal
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Apéndice: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.apendice === null || !orejas.apendice
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
          <Text style={{ fontWeight: 700 }}>Auriculares: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.auriculares === null || !orejas.auriculares
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
          <Text style={{ fontWeight: 700 }}>Ausencia del CAE: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.ausencia_cae === null || !orejas.ausencia_cae
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Estenosis del CAE: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.estenosis_cae === null || !orejas.estenosis_cae
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
          <Text style={{ fontWeight: 700 }}>Fístula: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                orejas.fistula === null || !orejas.fistula
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Obs: </Text>
          {orejas.obs || "sin dato..."}
        </Text>
      </View>
    </View>
  );
};

export default OrejasPDF;
