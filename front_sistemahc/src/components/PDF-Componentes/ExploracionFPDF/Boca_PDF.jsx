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
const BocaPDF = ({ boca }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>7. Boca</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Labio leporino: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.leporino === null || !boca.leporino
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
          <Text style={{ fontWeight: 700 }}>Labio vol.: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.vol === null || !boca.vol
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
          <Text style={{ fontWeight: 700 }}>Fosetas en labio inf.: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.fosetasInf === null || !boca.fosetasInf
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
          <Text style={{ fontWeight: 700 }}>
            Comisuras desviadas, hacia abajo:{" "}
          </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.comisuras === null || !boca.comisuras
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
          <Text style={{ fontWeight: 700 }}>Microstomía: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.microstomia === null || !boca.microstomia
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
          <Text style={{ fontWeight: 700 }}>Macrostomía: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.macrostomia === null || !boca.macrostomia
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
          <Text style={{ fontWeight: 700 }}>Macroglosia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.macroglosia === null || !boca.macroglosia
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
          <Text style={{ fontWeight: 700 }}>Lengua hendida: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.lenguaHendida === null || !boca.lenguaHendida
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
          <Text style={{ fontWeight: 700 }}>Lengua geografica: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.lenguaGeo === null || !boca.lenguaGeo
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
          <Text style={{ fontWeight: 700 }}>Frenillo corto: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.frenillo === null || !boca.frenillo
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
          <Text style={{ fontWeight: 700 }}>Alt. dental: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.altDental === null || !boca.altDental
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
          <Text style={{ fontWeight: 700 }}>Fisura palatina: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.fisuraPalatina === null || !boca.fisuraPalatina
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
          <Text style={{ fontWeight: 700 }}>Paladar ojival: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.paladarOjival === null || !boca.paladarOjival
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
          <Text style={{ fontWeight: 700 }}>Paladar alto: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.paladarAlto === null || !boca.paladarAlto
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
          <Text style={{ fontWeight: 700 }}>Úvula bífida: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                boca.uvulaBifida === null || !boca.uvulaBifida
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
        <Text style={{ fontWeight: 700 }}>Palpación del paladar: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              boca.palpacionPaladar === null || !boca.palpacionPaladar
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {boca.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default BocaPDF;
