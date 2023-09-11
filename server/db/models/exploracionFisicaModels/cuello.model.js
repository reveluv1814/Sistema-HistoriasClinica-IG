const { Model, DataTypes, Sequelize } = require("sequelize");

const CUELLO_TABLE = "cuello";

const CuelloSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  corto: { allowNull: true, type: DataTypes.BOOLEAN },
  quistes: { allowNull: true, type: DataTypes.BOOLEAN },
  fistula: { allowNull: true, type: DataTypes.BOOLEAN },
  colli: { allowNull: true, type: DataTypes.BOOLEAN },
  torticolis: { allowNull: true, type: DataTypes.BOOLEAN },
  tiroides: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Cuello extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "cuelloId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUELLO_TABLE,
      modelName: "Cuello",
      timestamps: false,
    };
  }
}

module.exports = { CUELLO_TABLE, CuelloSchema, Cuello };
