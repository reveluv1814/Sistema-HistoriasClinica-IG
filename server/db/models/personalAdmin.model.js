const { Model, DataTypes, Sequelize } = require("sequelize");

const { USUARIO_TABLE } = require("./usuario.model");
const { PERSONA_TABLE } = require("./persona.model");

const PERSONAL_ADMIN_TABLE = "personalAdmin";

const PersonalAdminSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cargo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  usuarioId: {
    field: "usuario_id",
    allowNull: false,
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

class PersonalAdmin extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: "usuario" });
    this.belongsTo(models.Persona, { as: "persona" });
    /* this.hasOne(models.Paciente, {
      as: "paciente",
      foreignKey: "personalAd_Id",
    }); */
    this.hasMany(models.Cita, {
      as: "cita",
      foreignKey: "personalAd_Id",
    });
    this.belongsToMany(models.Paciente, {
      as: "pacientes",
      through: models.P_creaPac,
      foreignKey: "personalAd_Id",
      otherKey: "pacienteId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSONAL_ADMIN_TABLE,
      modelName: "PersonalAdmin",
      timestamps: false,
    };
  }
}

module.exports = { PersonalAdmin, PersonalAdminSchema, PERSONAL_ADMIN_TABLE };
