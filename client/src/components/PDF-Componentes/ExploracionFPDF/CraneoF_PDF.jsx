import React from "react";
import { Text, View, StyleSheet} from "@react-pdf/renderer";

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
const CraneoFPDF = ({ craneoF }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>2. Craneo Facial</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Microcefalia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.microcefalia === null || !craneoF.microcefalia
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
          <Text style={{ fontWeight: 700 }}>Macrocefalia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.macrocefalia === null || !craneoF.macrocefalia
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
          <Text style={{ fontWeight: 700 }}>Hidrocefalia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.hidrocefalia === null || !craneoF.hidrocefalia
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
          <Text style={{ fontWeight: 700 }}>Cráneosinostosis: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.craneossino === null || !craneoF.craneossino
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
          <Text style={{ fontWeight: 700 }}>Occipital plano: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.occipital_p === null || !craneoF.occipital_p
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
          <Text style={{ fontWeight: 700 }}>Occipital prominente: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.prominente === null || !craneoF.prominente
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
          <Text style={{ fontWeight: 700 }}>Abultamiento frontal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.abultamiento_f === null || !craneoF.abultamiento_f
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
          <Text style={{ fontWeight: 700 }}>Glabela prominente: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.glabela_p === null || !craneoF.glabela_p
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
          <Text style={{ fontWeight: 700 }}>Asimetría craneal: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.asimetria_c === null || !craneoF.asimetria_c
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
          <Text style={{ fontWeight: 700 }}>Braquicefalia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.braquicefalia === null || !craneoF.braquicefalia
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
          <Text style={{ fontWeight: 700 }}>
            Áreas de aplasia de cuero cabelludo:{" "}
          </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.aplasia_cuero === null || !craneoF.aplasia_cuero
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Implantación de cabellos: </Text>
          {craneoF.implantación_cabello || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Hipoplasia malar: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.hipoplasia === null || !craneoF.hipoplasia
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
          <Text style={{ fontWeight: 700 }}>Suturas: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                craneoF.suturas === null || !craneoF.suturas
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Suturas descripción: </Text>
        {craneoF.suturas_des || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Fácies: </Text>
        {craneoF.facies || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {craneoF.obs || "sin dato..."}
      </Text>
    </View>
  );
};

export default CraneoFPDF;
