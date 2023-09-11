const { Model, DataTypes, Sequelize } = require("sequelize");

const ABDOMEN_TABLE = "abdomen";

const AbdomenSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  herniaUmbilical: { allowNull: true, type: DataTypes.BOOLEAN },
  herniaInguinal: { allowNull: true, type: DataTypes.BOOLEAN },
  diastasis: { allowNull: true, type: DataTypes.BOOLEAN },
  tumoraciones: { allowNull: true, type: DataTypes.BOOLEAN },
  semiologia: { allowNull: true, type: DataTypes.STRING },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Abdomen extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "abdomenId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ABDOMEN_TABLE,
      modelName: "Abdomen",
      timestamps: false,
    };
  }
}

module.exports = { ABDOMEN_TABLE, AbdomenSchema, Abdomen };
