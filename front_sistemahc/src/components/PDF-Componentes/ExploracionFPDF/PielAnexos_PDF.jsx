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
    fontSize: 8,
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
const PielAnexosPDF = ({ pielAnexos }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>16. Piel y Anexos</Text>
      <Text style={styles.textoDescripcion}>Pigmentación cutánea:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Normal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.pigmentacion === null || !pielAnexos.pigmentacion
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
          <Text style={{ fontWeight: 700 }}>Aumento generalizado: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.aumentoGen === null || !pielAnexos.aumentoGen
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
          <Text style={{ fontWeight: 700 }}>Disminución generalizada: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.disminucionGen === null || !pielAnexos.disminucionGen
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textoDescripcion}>Albinismo:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Total: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.albinTotal === null || !pielAnexos.albinTotal
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
          <Text style={{ fontWeight: 700 }}>Parcial: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.albinParcial === null || !pielAnexos.albinParcial
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
          <Text style={{ fontWeight: 700 }}>Vitíligo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.vitiligo === null || !pielAnexos.vitiligo
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
          <Text style={{ fontWeight: 700 }}>Manchas café con leche: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.manchasCL === null || !pielAnexos.manchasCL
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
          <Text style={{ fontWeight: 700 }}>Máculas periorales: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.maculas === null || !pielAnexos.maculas
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
          <Text style={{ fontWeight: 700 }}>Otras manchas: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.otrasManchas === null || !pielAnexos.otrasManchas
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
        <Text style={{ fontWeight: 700 }}>Hemangiomas y Telangieotasias: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              pielAnexos.hemanTela === null || !pielAnexos.hemanTela
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textoDescripcion}>Alopesía:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Generalizada: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.alopesiaGen === null || !pielAnexos.alopesiaGen
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
          <Text style={{ fontWeight: 700 }}>Parcial: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.alopesiaPar === null || !pielAnexos.alopesiaPar
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
          <Text style={{ fontWeight: 700 }}>Irsutismo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.irsutismo === null || !pielAnexos.irsutismo
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textoDescripcion}>Hipoplasia o displasia:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Uñas de manos: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.hipoDisManos === null || !pielAnexos.hipoDisManos
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
          <Text style={{ fontWeight: 700 }}>Pies: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.hipoDisPies === null || !pielAnexos.hipoDisPies
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
          <Text style={{ fontWeight: 700 }}>Tumoraciones: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                pielAnexos.hipoDisTumo === null || !pielAnexos.hipoDisTumo
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Vellos faciales: </Text>
        {pielAnexos.vellosFaciales || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Vellos axilares: </Text>
        {pielAnexos.vellosAxilares || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Vellos púbicos: </Text>
        {pielAnexos.vellosPubi || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Vellos corporales: </Text>
        {pielAnexos.vellosCorpo || "sin dato..."}
      </Text>
    </View>
  );
};

export default PielAnexosPDF;
