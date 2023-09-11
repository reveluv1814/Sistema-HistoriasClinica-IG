const { Model, DataTypes, Sequelize } = require("sequelize");

const BOCA_TABLE = "boca";

const BocaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  leporino: { allowNull: true, type: DataTypes.BOOLEAN },
  vol: { allowNull: true, type: DataTypes.BOOLEAN },
  fosetasInf: { allowNull: true, type: DataTypes.BOOLEAN },
  comisuras: { allowNull: true, type: DataTypes.BOOLEAN },
  microstomia: { allowNull: true, type: DataTypes.BOOLEAN },
  macrostomia: { allowNull: true, type: DataTypes.BOOLEAN },
  macroglosia: { allowNull: true, type: DataTypes.BOOLEAN },
  lenguaHendida: { allowNull: true, type: DataTypes.BOOLEAN },
  lenguaGeo: { allowNull: true, type: DataTypes.BOOLEAN },
  frenillo: { allowNull: true, type: DataTypes.BOOLEAN },
  altDental: { allowNull: true, type: DataTypes.BOOLEAN },
  fisuraPalatina: { allowNull: true, type: DataTypes.BOOLEAN },
  paladarOjival: { allowNull: true, type: DataTypes.BOOLEAN },
  uvulaBifida: { allowNull: true, type: DataTypes.BOOLEAN },
  palpacionPaladar: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Boca extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "bocaId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOCA_TABLE,
      modelName: "Boca",
      timestamps: false,
    };
  }
}

module.exports = { BOCA_TABLE, BocaSchema, Boca };
