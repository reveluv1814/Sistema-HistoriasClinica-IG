const { Model, DataTypes, Sequelize } = require("sequelize");
const { PERSONAL_ADMIN_TABLE } = require("./personalAdmin.model");
const { PACIENTE_TABLE } = require("./paciente.model");

const PCREA_PAC_TABLE = "p_creaPac";

const P_creaPacSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  pacienteId: {
    field: "pacienteId",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PACIENTE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  personalAd_Id: {
    field: "personalAd_Id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSONAL_ADMIN_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  historiaId: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class P_creaPac extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PCREA_PAC_TABLE,
      modelName: "P_creaPac",
      timestamps: false,
    };
  }
}

module.exports = { PCREA_PAC_TABLE, P_creaPacSchema, P_creaPac };
