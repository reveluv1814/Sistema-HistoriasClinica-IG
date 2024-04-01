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
const MusculaturaPDF = ({ musculatura }) => {
  // normotrofica: "Normotrófica:",
  // hipotrofica: "Hipotrófica:",
  // hipertrofica: "Hipertrófica:",
  // normotonica: "Normotónica::",
  // hipotonica: "Hipotónica:",
  // hipertonica: "Hipertónica:",
  // fuerzaMus: "Fuerza muscular:",
  // agenesia: "Agenesia muscular congénita:",
  // agenesiaEspeci: "Especificar Agenesia:",
  // obs: "Obs:",

  // normotrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  // hipotrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  // hipertrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  // normotonica: { allowNull: true, type: DataTypes.BOOLEAN },
  // hipotonica: { allowNull: true, type: DataTypes.BOOLEAN },
  // hipertonica: { allowNull: true, type: DataTypes.BOOLEAN },
  // fuerzaMus: { allowNull: true, type: DataTypes.STRING },
  // agenesia: { allowNull: true, type: DataTypes.BOOLEAN },
  // agenesiaEspeci: { allowNull: true, type: DataTypes.STRING },
  // obs: { allowNull: true, type: DataTypes.STRING },

  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>15. Musculatura</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Normotrófica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.normotrofica === null || !musculatura.normotrofica
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
          <Text style={{ fontWeight: 700 }}>Hipotrófica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.hipotrofica === null || !musculatura.hipotrofica
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
          <Text style={{ fontWeight: 700 }}>Hipertrófica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.hipertrofica === null || !musculatura.hipertrofica
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
          <Text style={{ fontWeight: 700 }}>Normotónica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.normotonica === null || !musculatura.normotonica
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
          <Text style={{ fontWeight: 700 }}>Hipotónica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.hipotonica === null || !musculatura.hipotonica
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
          <Text style={{ fontWeight: 700 }}>Hipertónica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.hipertonica === null || !musculatura.hipertonica
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={[styles.filaApartado, { width: "60%" }]}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Fuerza muscular: </Text>
          {musculatura.fuerzaMus || "sin dato..."}
        </Text>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Agenesia muscular congénita: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                musculatura.agenesia === null || !musculatura.agenesia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Especificar Agenesia: </Text>
        {musculatura.agenesiaEspeci || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {musculatura.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default MusculaturaPDF;
