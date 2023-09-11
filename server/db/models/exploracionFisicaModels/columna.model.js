const { Model, DataTypes, Sequelize } = require("sequelize");

const COLUMNA_TABLE = "columna";

const ColumnaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  cifosis: { allowNull: true, type: DataTypes.BOOLEAN },
  escoliosis: { allowNull: true, type: DataTypes.BOOLEAN },
  lordosis: { allowNull: true, type: DataTypes.BOOLEAN },
  apendice: { allowNull: true, type: DataTypes.BOOLEAN },
  fovea: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Columna extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "columnaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COLUMNA_TABLE,
      modelName: "Columna",
      timestamps: false,
    };
  }
}

module.exports = { COLUMNA_TABLE, ColumnaSchema, Columna };
