const { Model, DataTypes, Sequelize } = require("sequelize");

const TORAX_TABLE = "torax";

const ToraxSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  cajaPequeña: { allowNull: true, type: DataTypes.BOOLEAN },
  esternonCorto: { allowNull: true, type: DataTypes.BOOLEAN },
  escavado: { allowNull: true, type: DataTypes.BOOLEAN },
  quilla: { allowNull: true, type: DataTypes.BOOLEAN },
  mamasAnormales: { allowNull: true, type: DataTypes.BOOLEAN },
  politelia: { allowNull: true, type: DataTypes.BOOLEAN },
  defectosCostales: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  pulmones: { allowNull: true, type: DataTypes.STRING },
  cardioTa: { allowNull: true, type: DataTypes.DOUBLE },
  cardioTaSobre: { allowNull: true, type: DataTypes.DOUBLE },
  cardioFc: { allowNull: true, type: DataTypes.DOUBLE },
  cardioBM: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Torax extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "toraxId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TORAX_TABLE,
      modelName: "Torax",
      timestamps: false,
    };
  }
}

module.exports = { TORAX_TABLE, ToraxSchema, Torax };
