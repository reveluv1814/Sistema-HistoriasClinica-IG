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
  textoSubSubApartado: {
    fontSize: 9,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
  },
  textoDescripcion: {
    fontSize: 8,
    fontFamily: "Opensans",
    color: "#344955",
    fontWeight: 700,
    marginBottom: 3,
  },
  filaApartado: {
    display: "flex",
    fontFamily: "Opensans",
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
const MiembrosPDF = ({ miembros }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>12. Miembros</Text>
      <Text style={styles.textoSubSubApartado}>A. Miembros Superiores</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Manos Pequeñas: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supManosP === null || !miembros.supManosP
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
          <Text style={{ fontWeight: 700 }}>Braquidactilia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supBraquiactilia === null || !miembros.supBraquiactilia
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
          <Text style={{ fontWeight: 700 }}>Aracnodactilia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supAracnodactilia === null ||
                !miembros.supAracnodactilia
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
        <Text style={{ fontWeight: 700 }}>Polidactilia: </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              miembros.supPolidactilia === null || !miembros.supPolidactilia
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Tipo de polidactilia: </Text>
        {miembros.supTipoPoli || "sin dato..."}
      </Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Sindactilia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supSindactilia === null || !miembros.supSindactilia
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
          <Text style={{ fontWeight: 700 }}>Cutánea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supCutanea === null || !miembros.supCutanea
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
          <Text style={{ fontWeight: 700 }}>Ósea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supOsea === null || !miembros.supOsea
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Dedos: </Text>
        {miembros.supDedos || "sin dato..."}
      </Text>
      <Text style={styles.textoDescripcion}>Pliegue:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Simeano: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supPliegueSimeano === null ||
                !miembros.supPliegueSimeano
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
          <Text style={{ fontWeight: 700 }}>Completo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supPliegueCompleto === null ||
                !miembros.supPliegueCompleto
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
          <Text style={{ fontWeight: 700 }}>Imcompleto: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supPliegueImcompleto === null ||
                !miembros.supPliegueImcompleto
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
          <Text style={{ fontWeight: 700 }}>Pliegue único en el 5º dedo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supPliegueQuinto === null || !miembros.supPliegueQuinto
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
            Hipoplasia de la 2º falange del 5º dedo:{" "}
          </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supHipoplasia === null || !miembros.supHipoplasia
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
          <Text style={{ fontWeight: 700 }}>Clinodactilia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.supClinodactilia === null || !miembros.supClinodactilia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Dedo(s): </Text>
        {miembros.supEspDedos || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Cavalgamiento de dedo(s): </Text>
        {miembros.supCavalgamiento || "sin dato..."}
      </Text>
      <View
        style={[
          styles.textApartado,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text style={{ fontWeight: 700 }}>
          Deformidad por acortamiento del miembro superior:{" "}
        </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              miembros.supDeformidad === null || !miembros.supDeformidad
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {miembros.supObs || "sin dato..."}
      </Text>
      <Text style={styles.textoSubSubApartado}>B. Miembros Inferiores</Text>
      <View style={[styles.filaApartado, { width: "60%" }]}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Pies pequeños: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infPiePeque === null || !miembros.infPiePeque
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
          <Text style={{ fontWeight: 700 }}>Polidactilia: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infPolidactilia === null || !miembros.infPolidactilia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>
          Implantación de dedo(s) extra(s):{" "}
        </Text>
        {miembros.infImplantacion || "sin dato..."}
      </Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Sindactila: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infSindactilia === null || !miembros.infSindactilia
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
          <Text style={{ fontWeight: 700 }}>Cutánea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infCutanea === null || !miembros.infCutanea
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
          <Text style={{ fontWeight: 700 }}>Ósea: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infOsea === null || !miembros.infOsea
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Dedos: </Text>
        {miembros.infDedos || "sin dato..."}
      </Text>
      <Text style={styles.textoDescripcion}>Alt. congénita:</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Cavo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infCavo === null || !miembros.infCavo
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
          <Text style={{ fontWeight: 700 }}>Calcáneo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infCalcaneo === null || !miembros.infCalcaneo
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
          <Text style={{ fontWeight: 700 }}>Equino: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infEquino === null || !miembros.infEquino
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
          <Text style={{ fontWeight: 700 }}>Varo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infVaro === null || !miembros.infVaro
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
          <Text style={{ fontWeight: 700 }}>Valgo: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infValgo === null || !miembros.infValgo
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
          <Text style={{ fontWeight: 700 }}>Pie plano: </Text>
          <View style={styles.checkbox}>
            <View
              style={[
                miembros.infPiePlano === null || !miembros.infPiePlano
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
        <Text style={{ fontWeight: 700 }}>
          Distancia aumentada entre halux y 2º dedo Deformidad por reducción del
          miembro inferior:{" "}
        </Text>
        <View style={styles.checkbox}>
          <View
            style={[
              miembros.infDistancia === null || !miembros.infDistancia
                ? styles.unchecked
                : styles.checked,
            ]}
          />
        </View>
      </View>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Obs: </Text>
        {miembros.infObs || "sin dato..."}
      </Text>
      <Text style={styles.textoSubSubApartado}>C. Articulaciones</Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Limitación de movimientos: </Text>
        {miembros.artiLimitaciones || "sin dato..."}
      </Text>
      <Text style={styles.textApartado}>
        <Text style={{ fontWeight: 700 }}>Hiperextensibilidad articular: </Text>
        {miembros.artiHiperex || "sin dato..."}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 9,
          marginBottom: 2,
          fontFamily: "Opensans",
        }}
      >
        <Text style={{ fontWeight: 700 }}>
          Contracción generalizada por flexion de las articulaciones de miembros
          - luxación congénita, Especificado:{" "}
        </Text>
        <Text>{miembros.artiContracion || "sin dato..."}</Text>
      </View>
    </View>
  );
};

export default MiembrosPDF;
