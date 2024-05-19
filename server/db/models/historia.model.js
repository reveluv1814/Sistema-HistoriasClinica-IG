const { Model, DataTypes, Sequelize } = require("sequelize");
const { ANTECEDENTE_F_TABLE } = require("./antecedenteFamiliar.model");
const { ANTECEDENTE_P_TABLE } = require("./antecedentePersonal.model");
const { EXPLORACION_F_TABLE } = require("./exploracionFisica.model");

const HISTORIA_TABLE = "historiaClinica";

const HistoriaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  arbolGene: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  //agregar las ids foraneas
  antecedenteFId: {
    field: "antecedenteF_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: ANTECEDENTE_F_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  antecedentePId: {
    field: "antecedenteP_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: ANTECEDENTE_P_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  exploracionFId: {
    field: "exploracionF_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: EXPLORACION_F_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Historia extends Model {
  static associate(models) {
    //asociaciones
    this.hasMany(models.Cita, {
      as: "citas",
      foreignKey: "historiaId",
    });
    this.belongsTo(models.AntecedentesF, { as: "antecedenteF" });
    this.belongsTo(models.AntecedentesP, { as: "antecedenteP" });
    this.hasMany(models.ComposicionF, {
      as: "composicionesF",
      foreignKey: "historiaId",
    });
    this.belongsTo(models.ExploracionF, { as: "exploracionF" });
    //
    this.belongsToMany(models.Laboratorista, {
      through: models.HistoriaLabo,
      as: "laboratoristas",
      foreignKey: "historiaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HISTORIA_TABLE,
      modelName: "HistoriaClinica",
      timestamps: false,
    };
  }
}

module.exports = { HISTORIA_TABLE, HistoriaSchema, Historia };
