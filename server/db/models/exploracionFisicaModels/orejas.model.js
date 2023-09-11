const { Model, DataTypes, Sequelize } = require("sequelize");

const OREJAS_TABLE = "orejas";

const OrejasSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  implantacion: { allowNull: true, type: DataTypes.STRING },
  microtia: { allowNull: true, type: DataTypes.BOOLEAN },
  pabellon_mal: { allowNull: true, type: DataTypes.BOOLEAN },
  apendice: { allowNull: true, type: DataTypes.BOOLEAN },
  auriculares: { allowNull: true, type: DataTypes.BOOLEAN },
  ausencia_cae: { allowNull: true, type: DataTypes.BOOLEAN },
  estenosis_cae: { allowNull: true, type: DataTypes.BOOLEAN },
  fistula: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Orejas extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "orejasId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OREJAS_TABLE,
      modelName: "Orejas",
      timestamps: false,
    };
  }
}

module.exports = { OREJAS_TABLE, OrejasSchema, Orejas };
