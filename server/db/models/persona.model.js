const { Model, DataTypes, Sequelize } = require("sequelize");

const PERSONA_TABLE = "persona";

const PersonaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellidoMaterno: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellidoPaterno: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  telefono: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  foto: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  es_persona: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Persona extends Model {
  static associate(models) {
    this.hasOne(models.Doctor, {
      as: "doctor",
      foreignKey: "personaId",
    });
    this.hasOne(models.PersonalAdmin, {
      as: "personalAdmin",
      foreignKey: "personaId",
    });
    this.hasOne(models.Laboratorista, {
      as: "laboratorista",
      foreignKey: "personaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSONA_TABLE,
      modelName: "Persona",
      timestamps: false,
    };
  }
}

module.exports = { PERSONA_TABLE, PersonaSchema, Persona };
