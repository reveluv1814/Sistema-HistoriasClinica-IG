import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  sectionApartado: {
    marginBottom: 4,
    marginTop: 4,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tableCellHeader: {
    margin: 4,
    fontSize: 7,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 4,
    fontSize: 7,
  },
});

const ComposicionFPDF = ({ composicionesF }) => {
  const fechaFormateada = (fechaProp) => {
    if (fechaProp === null) return null;
    const fecha = new Date(fechaProp);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getUTCFullYear();

    return `${dia}/${mes}/${año}`;
  };
  return (
    <View style={styles.sectionApartado}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Gestación Nº</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Nombre del hijo</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Sexo</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Edad</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Fecha nac.</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Obs.</Text>
          </View>
        </View>
        {/* Table Rows */}
        {composicionesF.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {fila.nrogestacion || "sin dato"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, { textTransform: "capitalize" }]}>
                {fila.nomHijo || "sin dato"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fila.sexo || "sin dato"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fila.edad || "sin dato"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {fechaFormateada(fila.fechanac)}
              </Text>
            </View>
            <View style={[styles.tableCol, { alignItems: "flex-start" }]}>
              <Text
                style={[styles.tableCell, { justifyContent: "flex-start" }]}
              >
                {fila.obs}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ComposicionFPDF;
