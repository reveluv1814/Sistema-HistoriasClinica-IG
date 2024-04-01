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
const ToraxPDF = ({ torax }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>9. Tórax</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Caja toraxica pequeña: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.cajaPequeña === null || !torax.cajaPequeña
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
          <Text style={{ fontWeight: 700 }}>Esternon corto: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.esternonCorto === null || !torax.esternonCorto
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
          <Text style={{ fontWeight: 700 }}>Escavado: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.escavado === null || !torax.escavado
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
          <Text style={{ fontWeight: 700 }}>En Quilla: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.quilla === null || !torax.quilla
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
          <Text style={{ fontWeight: 700 }}>Mamas-anormales: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.mamasAnormales === null || !torax.mamasAnormales
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
          <Text style={{ fontWeight: 700 }}>Politelia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                torax.politelia === null || !torax.politelia
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
        <Text style={{ fontWeight: 700 }}>Defectos-costales: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              torax.defectosCostales === null || !torax.defectosCostales
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {torax.obs || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Pulmones: </Text>
        {torax.pulmones || "sin dato..."}
      </Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Cardio - Circulatorio TA: </Text>
          {torax.cardioTa || "-"}
          {" / "}
          {torax.cardioTaSobre || "- "}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>FC: </Text>
          {torax.cardioFc || "-"}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>b.m.: </Text>
          {torax.cardioBM || "sin dato..."}
        </Text>
      </View>
    </View>
  );
};

export default ToraxPDF;
