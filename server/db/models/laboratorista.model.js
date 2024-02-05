const { Model, DataTypes, Sequelize } = require("sequelize");

const { USUARIO_TABLE } = require("./usuario.model");
const { PERSONA_TABLE } = require("./persona.model");

const LABORATORISTA_TABLE = "laboratorista";

const LaboratoristaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  especialidad: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  matriculaProf: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  usuarioId: {
    field: "usuario_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USUARIO_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
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
};

class Laboratorista extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: "usuario" });
    this.belongsTo(models.Persona, { as: "persona" });
    //
    this.belongsToMany(models.HistoriaClinica, {
      through: models.HistoriaLabo,
      as: "historias",
      foreignKey: "laboratoristaId",
    });
    /* this.belongsToMany(models.Paciente, {
      as: "pacientes",
      through: models.P_creaPac,
      foreignKey: "personalAd_Id",
      otherKey: "pacienteId",
    }); */
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LABORATORISTA_TABLE,
      modelName: "Laboratorista",
      timestamps: false,
    };
  }
}

module.exports = { Laboratorista, LaboratoristaSchema, LABORATORISTA_TABLE };
