const { Model, DataTypes, Sequelize } = require("sequelize");

const TEJIDO_SUB_TABLE = "tejidoSubcutaneo";

const TejidoSubSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  espesor: { allowNull: true, type: DataTypes.STRING },
  turgor: { allowNull: true, type: DataTypes.STRING },
  edemaManos: { allowNull: true, type: DataTypes.BOOLEAN },
  edemaPies: { allowNull: true, type: DataTypes.BOOLEAN },
  edemaOtros: { allowNull: true, type: DataTypes.STRING },
  ganglios: { allowNull: true, type: DataTypes.STRING },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class TejidoSub extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "tejidoSubId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEJIDO_SUB_TABLE,
      modelName: "TejidoSub",
      timestamps: false,
    };
  }
}

module.exports = { TEJIDO_SUB_TABLE, TejidoSubSchema, TejidoSub };
