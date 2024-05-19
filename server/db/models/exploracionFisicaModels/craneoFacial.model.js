const { Model, DataTypes, Sequelize } = require("sequelize");

const CRANEO_F_TABLE = "craneoFacial";

const CraneoFSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  microcefalia: { allowNull: true, type: DataTypes.BOOLEAN },
  macrocefalia: { allowNull: true, type: DataTypes.BOOLEAN },
  hidrocefalia: { allowNull: true, type: DataTypes.BOOLEAN },
  craneossino: { allowNull: true, type: DataTypes.BOOLEAN },
  occipital_p: { allowNull: true, type: DataTypes.BOOLEAN },
  prominente: { allowNull: true, type: DataTypes.BOOLEAN },
  abultamiento_f: { allowNull: true, type: DataTypes.BOOLEAN },
  glabela_p: { allowNull: true, type: DataTypes.BOOLEAN },
  asimetria_c: { allowNull: true, type: DataTypes.BOOLEAN },
  braquicefalia: { allowNull: true, type: DataTypes.BOOLEAN },
  aplasia_cuero: { allowNull: true, type: DataTypes.BOOLEAN },
  implantación_cabello: { allowNull: true, type: DataTypes.STRING },
  hipoplasia: { allowNull: true, type: DataTypes.BOOLEAN },
  suturas: { allowNull: true, type: DataTypes.BOOLEAN },
  suturas_des: { allowNull: true, type: DataTypes.STRING },
  facies: { allowNull: true, type: DataTypes.STRING },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class CraneoF extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "craneoFId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CRANEO_F_TABLE,
      modelName: "CraneoF",
      timestamps: false,
    };
  }
}

module.exports = { CRANEO_F_TABLE, CraneoFSchema, CraneoF };
