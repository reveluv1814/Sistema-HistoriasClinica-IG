const { Model, DataTypes, Sequelize } = require("sequelize");

const OJOS_TABLE = "ojos";

const OjosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  sinofiris: { allowNull: true, type: DataTypes.BOOLEAN },
  ptosis_p: { allowNull: true, type: DataTypes.BOOLEAN },
  estrabismo: { allowNull: true, type: DataTypes.BOOLEAN },
  convergente: { allowNull: true, type: DataTypes.BOOLEAN },
  divergente: { allowNull: true, type: DataTypes.BOOLEAN },
  infeccion: { allowNull: true, type: DataTypes.BOOLEAN },
  epifora: { allowNull: true, type: DataTypes.BOOLEAN },
  anoftalmina: { allowNull: true, type: DataTypes.BOOLEAN },
  microftalmina: { allowNull: true, type: DataTypes.BOOLEAN },
  hipertelorismo: { allowNull: true, type: DataTypes.BOOLEAN },
  epicanto: { allowNull: true, type: DataTypes.BOOLEAN },
  angulo_oblicuos: { allowNull: true, type: DataTypes.STRING },
  exoftalmina: { allowNull: true, type: DataTypes.BOOLEAN },
  nistagmus: { allowNull: true, type: DataTypes.BOOLEAN },
  escleras_azul: { allowNull: true, type: DataTypes.BOOLEAN },
  coloboma: { allowNull: true, type: DataTypes.BOOLEAN },
  aniridia: { allowNull: true, type: DataTypes.BOOLEAN },
  maculas_iris: { allowNull: true, type: DataTypes.BOOLEAN },
  catarata: { allowNull: true, type: DataTypes.BOOLEAN },
  leucoma: { allowNull: true, type: DataTypes.BOOLEAN },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Ojos extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "ojosId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OJOS_TABLE,
      modelName: "Ojos",
      timestamps: false,
    };
  }
}

module.exports = { OJOS_TABLE, OjosSchema, Ojos };
