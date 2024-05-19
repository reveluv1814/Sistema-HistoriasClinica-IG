const { Model, DataTypes, Sequelize } = require("sequelize");

const MUSCULATURA_TABLE = "musculatura";

const MusculaturaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  normotrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  hipotrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  hipertrofica: { allowNull: true, type: DataTypes.BOOLEAN },
  normotonica: { allowNull: true, type: DataTypes.BOOLEAN },
  hipotonica: { allowNull: true, type: DataTypes.BOOLEAN },
  hipertonica: { allowNull: true, type: DataTypes.BOOLEAN },
  fuerzaMus: { allowNull: true, type: DataTypes.STRING },
  agenesia: { allowNull: true, type: DataTypes.BOOLEAN },
  agenesiaEspeci: { allowNull: true, type: DataTypes.STRING },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Musculatura extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "musculaturaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MUSCULATURA_TABLE,
      modelName: "Musculatura",
      timestamps: false,
    };
  }
}

module.exports = { MUSCULATURA_TABLE, MusculaturaSchema, Musculatura };
