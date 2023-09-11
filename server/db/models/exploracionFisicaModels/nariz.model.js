const { Model, DataTypes, Sequelize } = require("sequelize");

const NARIZ_TABLE = "nariz";

const NarizSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  puentenasal: { allowNull: true, type: DataTypes.BOOLEAN },
  stenosis: { allowNull: true, type: DataTypes.STRING },
  tabique: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoplasis: { allowNull: true, type: DataTypes.BOOLEAN },
  narizProminente: { allowNull: true, type: DataTypes.BOOLEAN },
  tipoNariz: { allowNull: true, type: DataTypes.STRING },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Nariz extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "narizId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NARIZ_TABLE,
      modelName: "Nariz",
      timestamps: false,
    };
  }
}

module.exports = { NARIZ_TABLE, NarizSchema, Nariz };
