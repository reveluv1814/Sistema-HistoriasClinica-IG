import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSBold from "../../font/OpenSans_Condensed-Bold.ttf";
import OpenS from "../../font/OpenSans-Regular.ttf";

Font.register({
  family: "Opensans",
  fonts: [
    { src: OpenS, fontWeight: 400 },
    { src: OpenSBold, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  sectionApartado: {
    margin: 2,
    padding: 5,
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
  hr: {
    borderBottomColor: "#344955",
    borderBottomWidth: 0.5,
    marginBottom: 5,
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

const AntecedentesPPDF = ({ antecedenteP }) => {
  return (
    <View style={styles.sectionApartado}>
      <Text style={styles.textSubApartado}>1. Gestación</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Gesta: </Text>
          {antecedenteP.g_embarazo || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Obs.: </Text>
          {antecedenteP.g_obs || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>2. Patologías en el embarazo</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Fiebre: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_fiebre === null || !antecedenteP.pat_fiebre
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
          <Text style={{ fontWeight: 700 }}>Enf. Infec.: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_enfInfec === null || !antecedenteP.pat_enfInfec
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
          <Text style={{ fontWeight: 700 }}>Diabetes: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_diabetes === null || !antecedenteP.pat_diabetes
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
          <Text style={{ fontWeight: 700 }}>Epilepsia: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.pat_epilepsia === null ||
                !antecedenteP.pat_epilepsia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Otras enfermedades crónicas: </Text>
          {antecedenteP.pat_otras || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>
        3. Factores físicos durante el embarazo
      </Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Rayos X: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.factFis_rayosx === null ||
                !antecedenteP.factFis_rayosx
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
          <Text style={{ fontWeight: 700 }}>Ecografia X: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.factFis_ecografia === null ||
                !antecedenteP.factFis_ecografia
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
          <Text style={{ fontWeight: 700 }}>Ecografia: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.factFis_ecografia === null ||
                !antecedenteP.factFis_ecografia
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Lugar donde se realizó: </Text>
          {antecedenteP.factFis_lugar || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Nº de veces: </Text>
          {antecedenteP.factFis_numVeces || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>
        4. Factores químicos durante la gestación
      </Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Fármacos anticonvulsivantes: </Text>
          {antecedenteP.factQuim_farmacos || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>otros: </Text>
          {antecedenteP.factQuim_farmOtros || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Anticonceptivos orales: </Text>
          {antecedenteP.factQuim_anticonceptivos || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Gestágenos para evitar AB: </Text>
          {antecedenteP.fact_Quim_gestagenosAB || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Exposición Profesional: </Text>
          {antecedenteP.factQuim_expProfesional || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Enolismo: </Text>
          {antecedenteP.factQuim_enolismo || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>
        5. Observaciones durante la gestación
      </Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Gesta: </Text>
          {antecedenteP.gesta || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Para: </Text>
          {antecedenteP.gesta_para || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Nº Nativivos: </Text>
          {antecedenteP.gesta_nroNativivos || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Malformados: </Text>
          {antecedenteP.gesta_malformados || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Nº Natimortos: </Text>
          {antecedenteP.gesta_nroNatimortos || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Nº AB: </Text>
          {antecedenteP.gesta_nroAB || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Exp.: </Text>
          {antecedenteP.gesta_exp || "sin dato..."}
        </Text>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>
            Ind. de uso de anticonceptivos:{" "}
          </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.gesta_anticonceptivos === null ||
                !antecedenteP.gesta_anticonceptivos
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Tipo: </Text>
          {antecedenteP.gesta_anticonsTipo || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>
            Período entre 1º y 2º gestación:{" "}
          </Text>
          {antecedenteP.gesta_periodo_1_2 || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>
            Período entre 2º y 3º gestación:{" "}
          </Text>
          {antecedenteP.gesta_periodo_2_3 || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>
            Período entre 3º y 4º gestación:{" "}
          </Text>
          {antecedenteP.gesta_periodo_3_4 || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Período de uso: </Text>
          {antecedenteP.gesta_periodoUso || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>6. Parto</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Parto: </Text>
          {antecedenteP.parto || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>¿Por que?: </Text>
          {antecedenteP.parto_porque || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>7. Datos del nacimiento</Text>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Peso: </Text>
          {antecedenteP.dn_peso || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Talla: </Text>
          {antecedenteP.dn_talla || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>PC: </Text>
          {antecedenteP.dn_pc || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>APGAR: </Text>
          {antecedenteP.dn_apgar || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Llanto: </Text>
          {antecedenteP.dn_llanto || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Cianosis: </Text>
          {antecedenteP.dn_cianosis || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Oxígeno terapia: </Text>
          {antecedenteP.dn_oxigeno || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Incubadora: </Text>
          {antecedenteP.dn_incubadora || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Ictericia Neonatal: </Text>
          {antecedenteP.dn_ictericia || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Fototerapia: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_fotop === null || !antecedenteP.dn_fotop
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
          <Text style={{ fontWeight: 700 }}>Exsanguineo: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_exsanguineo === null ||
                !antecedenteP.dn_exsanguineo
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
          <Text style={{ fontWeight: 700 }}>Fiebre: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_exsan_fiebre === null ||
                !antecedenteP.dn_exsan_fiebre
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
          <Text style={{ fontWeight: 700 }}>Convulsiones: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_exsan_convul === null ||
                !antecedenteP.dn_exsan_convul
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Hemorragias: </Text>
          {antecedenteP.dn_hemorragia || "sin dato..."}
        </Text>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Inicio: </Text>
          {antecedenteP.dn_hemoIni || "sin dato..."}
        </Text>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Duración: </Text>
          {antecedenteP.dn_hemoDura || "sin dato..."}
        </Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.textSubApartado}>Otras alteraciones</Text>
      <View style={styles.filaApartado}>
        <View
          style={[
            styles.textApartado,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontWeight: 700 }}>Criptorquidea: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_altCriptorquidea === null ||
                !antecedenteP.dn_altCriptorquidea
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
          <Text style={{ fontWeight: 700 }}>Cardiopatía Congénita: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_altCardiopatia === null ||
                !antecedenteP.dn_altCardiopatia
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
          <Text style={{ fontWeight: 700 }}>FLAP: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_altFlap === null || !antecedenteP.dn_altFlap
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
          <Text style={{ fontWeight: 700 }}>Atresia anal: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_altAnal === null || !antecedenteP.dn_altAnal
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
          <Text style={{ fontWeight: 700 }}>Defectos de tubo Neural: </Text>
          <View style={[styles.checkbox]}>
            <View
              style={[
                antecedenteP.dn_altNeural === null || !antecedenteP.dn_altNeural
                  ? styles.unchecked
                  : styles.checked,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.filaApartado}>
        <Text style={styles.textApartado}>
          <Text style={{ fontWeight: 700 }}>Obs.: </Text>
          {antecedenteP.dn_altObs || "sin dato..."}
        </Text>
      </View>
    </View>
  );
};

export default AntecedentesPPDF;
