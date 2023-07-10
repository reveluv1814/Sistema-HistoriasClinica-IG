const { Model, DataTypes, Sequelize } = require("sequelize");

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
};

class Historia extends Model {
  static associate(models) {
    //asociaciones
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
