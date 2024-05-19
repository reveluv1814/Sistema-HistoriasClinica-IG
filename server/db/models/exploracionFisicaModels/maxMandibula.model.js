const { Model, DataTypes, Sequelize } = require("sequelize");

const MAX_MANDIBULA_TABLE = "maxMandibula";

const MaxMandibulaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  hipoplasiaMaxS:  { allowNull: true, type: DataTypes.BOOLEAN },
  micrognatia:  { allowNull: true, type: DataTypes.BOOLEAN },
  prognatismo:  { allowNull: true, type: DataTypes.BOOLEAN },
  retronagtismo:  { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class MaxMandibula extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "maxMandibulaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MAX_MANDIBULA_TABLE,
      modelName: "MaxMandibula",
      timestamps: false,
    };
  }
}

module.exports = { MAX_MANDIBULA_TABLE, MaxMandibulaSchema, MaxMandibula };
