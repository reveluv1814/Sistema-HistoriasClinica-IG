import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  sectionApartado: {
    marginBottom: 4,
    marginTop: 4,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "34%",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tableCol: {
    width: "34%",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
  },
});
const LaboratorioPDF = ({ laboratoristas }) => {
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
        {/* Cabecera de la tabla */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Exámen</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Fecha de creación</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Laboratorista</Text>
          </View>
        </View>
        {/* Filas de datos */}
        {laboratoristas.map((labHistoria, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {labHistoria.historiaLabo.examen || "sin dato..."}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {fechaFormateada(labHistoria.historiaLabo.createdAt)}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, { textTransform: "capitalize" }]}>
                {labHistoria.laboratorista.persona.nombreCompleto}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LaboratorioPDF;
