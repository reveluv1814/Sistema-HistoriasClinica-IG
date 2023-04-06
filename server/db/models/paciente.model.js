const { Model, DataTypes, Sequelize } = require("sequelize");

const { PERSONA_TABLE } = require("./persona.model");
const { PERSONAL_ADMIN_TABLE } = require("./personalAdmin.model");

const PACIENTE_TABLE = "paciente";

const PacienteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fechanac: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    get() {
      const fechanac = new Date(this.getDataValue("fechanac"));
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechanac.getFullYear();
      const mes = hoy.getMonth() - fechanac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechanac.getDate())) {
        edad--;
      }
      return edad;
    },
  },
  sexo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  raza: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  procedencia: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  residencia: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  personaId: {
    field: "persona_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PERSONA_TABLE,
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

class Paciente extends Model {
  static associate(models) {
    this.hasMany(models.Cita, {
      as: "cita",
      foreignKey: "pacienteId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PACIENTE_TABLE,
      modelName: "Paciente",
      timestamps: false,
    };
  }
}

module.exports = { PACIENTE_TABLE, PacienteSchema, Paciente };
