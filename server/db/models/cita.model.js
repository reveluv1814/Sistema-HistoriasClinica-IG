const { Model, DataTypes, Sequelize } = require("sequelize");

const { PACIENTE_TABLE } = require("./paciente.model");
const { DOCTOR_TABLE } = require("./doctor.model");
const { PERSONAL_ADMIN_TABLE } = require("./personalAdmin.model");

const CITA_TABLE = "cita";

const CitaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  hora: {
    allowNull: false,
    type: DataTypes.TIME,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  pacienteId: {
    field: "paciente_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PACIENTE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  doctorId: {
    field: "doctor_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: DOCTOR_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  personalAd_Id: {
    field: "personalAd_Id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PERSONAL_ADMIN_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Cita extends Model {
  static associate(models) {
    /*this.hasOne(models.Doctor, {
      as: "doctor",
      foreignKey: "personaId",
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CITA_TABLE,
      modelName: "Cita",
      timestamps: false,
    };
  }
}

module.exports = { CITA_TABLE, CitaSchema, Cita };
