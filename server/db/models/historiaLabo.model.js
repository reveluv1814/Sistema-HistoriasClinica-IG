const { Model, DataTypes, Sequelize } = require("sequelize");
const { HISTORIA_TABLE } = require("./historia.model");
const { LABORATORISTA_TABLE } = require("./laboratorista.model");

const HISTORIA_LABO_TABLE = "historiaLabo";

const HistoriaLaboSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  examen: { allowNull: true, type: DataTypes.STRING },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  historiaId: {
    type: DataTypes.INTEGER,
    references: { model: HISTORIA_TABLE, key: "id" },
    onDelete: "CASCADE",
    allowNull: false,
  },
  laboratoristaId: {
    type: DataTypes.INTEGER,
    references: { model: LABORATORISTA_TABLE, key: "id" },
    onDelete: "CASCADE",
    allowNull: false,
  },
};

class HistoriaLabo extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: HISTORIA_LABO_TABLE,
      modelName: "HistoriaLabo",
      timestamps: false,
    };
  }
}

module.exports = { HISTORIA_LABO_TABLE, HistoriaLaboSchema, HistoriaLabo };
