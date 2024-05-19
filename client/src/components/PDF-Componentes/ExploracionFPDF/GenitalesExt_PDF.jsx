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
  textoDescripcion: {
    fontSize: 9,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
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
    marginBottom: 2,
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
const GenitalesExtPDF = ({ genitalesEx }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>13. Genitales Externos</Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Tanner: </Text>
        {genitalesEx.tanner || "sin dato..."}
      </Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Anmbiguos: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.ambiguos === null || !genitalesEx.ambiguos
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
          <Text style={{ fontWeight: 700 }}>Criptorquidea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.criptorquidea === null || !genitalesEx.criptorquidea
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
          <Text style={{ fontWeight: 700 }}>Testículo retráctil: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.testiculoRetractil === null ||
                !genitalesEx.testiculoRetractil
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
          <Text style={{ fontWeight: 700 }}>Hipoplasia de Lab. May.: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.hipoMay === null || !genitalesEx.hipoMay
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
          <Text style={{ fontWeight: 700 }}>Hipo. Lab. Men.: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.hipoMen === null || !genitalesEx.hipoMen
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
          <Text style={{ fontWeight: 700 }}>Hipertrofia de clítoris: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.hipertrofiaClitoris === null ||
                !genitalesEx.hipertrofiaClitoris
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
        <Text style={{ fontWeight: 700 }}>Hidrocele congénito: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              genitalesEx.hidrocele === null || !genitalesEx.hidrocele
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textoDescripcion}>Hidospadia:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Meato balanoprepucial: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.meato === null || !genitalesEx.meato
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
          <Text style={{ fontWeight: 700 }}>Peneal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.peneal === null || !genitalesEx.peneal
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
          <Text style={{ fontWeight: 700 }}>Peneoescrotal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.peneoescrotal === null || !genitalesEx.peneoescrotal
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
          <Text style={{ fontWeight: 700 }}>Perineal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.perineal === null || !genitalesEx.perineal
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
          <Text style={{ fontWeight: 700 }}>Epispadia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.epispadia === null || !genitalesEx.epispadia
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
          <Text style={{ fontWeight: 700 }}>Fimosis: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                genitalesEx.fimosis === null || !genitalesEx.fimosis
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Tamaño del Pene (en cm): </Text>
        {genitalesEx.tamanioPene || "sin dato..."}
      </Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Testículo D (eje mayor): </Text>
          {genitalesEx.testiculoDMay || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Testículo I (eje mayor): </Text>
          {genitalesEx.testiculoIMay || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Testículo D (eje menor): </Text>
          {genitalesEx.testiculoDMen || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Testículo I (eje menor): </Text>
          {genitalesEx.testiculoIMen || "sin dato..."}
        </Text>
      </View>
    </View>
  );
};

export default GenitalesExtPDF;
