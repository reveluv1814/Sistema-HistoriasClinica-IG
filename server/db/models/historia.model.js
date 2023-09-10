const { Model, DataTypes, Sequelize } = require("sequelize");
const { ANTECEDENTE_F_TABLE } = require("./antecedenteFamiliar.model");
const { ANTECEDENTE_P_TABLE } = require("./antecedentePersonal.model");

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
    onDelete: "CASCADE",
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
