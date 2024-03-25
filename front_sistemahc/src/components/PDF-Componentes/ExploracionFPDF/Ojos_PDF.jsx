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
const OjosPDF = ({ ojos }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>4. Ojos</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Sinofiris: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.sinofiris === null || !ojos.sinofiris
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
          <Text style={{ fontWeight: 700 }}>Ptosis parpebral: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.ptosis_p === null || !ojos.ptosis_p
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
          <Text style={{ fontWeight: 700 }}>Estrabismo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.estrabismo === null || !ojos.estrabismo
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
          <Text style={{ fontWeight: 700 }}>Convergente: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.convergente === null || !ojos.convergente
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
          <Text style={{ fontWeight: 700 }}>Divergente: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.divergente === null || !ojos.divergente
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
          <Text style={{ fontWeight: 700 }}>Infección: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.infeccion === null || !ojos.infeccion
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
          <Text style={{ fontWeight: 700 }}>Epífora: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.epifora === null || !ojos.epifora
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
          <Text style={{ fontWeight: 700 }}>Anoftalmina: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.anoftalmina === null || !ojos.anoftalmina
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
          <Text style={{ fontWeight: 700 }}>Microftalmina: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.microftalmina === null || !ojos.microftalmina
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
          <Text style={{ fontWeight: 700 }}>Hipertelorismo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.hipertelorismo === null || !ojos.hipertelorismo
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
          <Text style={{ fontWeight: 700 }}>Epicanto: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.epicanto === null || !ojos.epicanto
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>
            Ángulos parpebrales oblicuos:{" "}
          </Text>
          {ojos.angulo_oblicuos || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Exoftalmina: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.exoftalmina === null || !ojos.exoftalmina
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
          <Text style={{ fontWeight: 700 }}>Nistagmus: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.nistagmus === null || !ojos.nistagmus
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
          <Text style={{ fontWeight: 700 }}>Escleras azules: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.escleras_azul === null || !ojos.escleras_azul
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
          <Text style={{ fontWeight: 700 }}>Coloboma: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.coloboma === null || !ojos.coloboma
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
          <Text style={{ fontWeight: 700 }}>Aniridia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.aniridia === null || !ojos.aniridia
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
          <Text style={{ fontWeight: 700 }}>Máculas en iris: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.maculas_iris === null || !ojos.maculas_iris
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
          <Text style={{ fontWeight: 700 }}>Catarata: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.catarata === null || !ojos.catarata
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
          <Text style={{ fontWeight: 700 }}>Leucoma: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                ojos.leucoma === null || !ojos.leucoma
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {ojos.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default OjosPDF;
