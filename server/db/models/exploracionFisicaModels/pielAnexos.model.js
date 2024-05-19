const { Model, DataTypes, Sequelize } = require("sequelize");

const PIEL_ANEXOS_TABLE = "pielAnexos";

const PielAnexosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  pigmentacion: { allowNull: true, type: DataTypes.BOOLEAN },
  aumentoGen: { allowNull: true, type: DataTypes.BOOLEAN },
  disminucionGen: { allowNull: true, type: DataTypes.BOOLEAN },
  albinTotal: { allowNull: true, type: DataTypes.BOOLEAN },
  albinParcial: { allowNull: true, type: DataTypes.BOOLEAN },
  vitiligo: { allowNull: true, type: DataTypes.BOOLEAN },
  manchasCL: { allowNull: true, type: DataTypes.BOOLEAN },
  maculas: { allowNull: true, type: DataTypes.BOOLEAN },
  otrasManchas: { allowNull: true, type: DataTypes.BOOLEAN },
  hemanTela: { allowNull: true, type: DataTypes.BOOLEAN },
  alopesiaGen: { allowNull: true, type: DataTypes.BOOLEAN },
  alopesiaPar: { allowNull: true, type: DataTypes.BOOLEAN },
  irsutismo: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoDisManos: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoDisPies: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoDisTumo: { allowNull: true, type: DataTypes.BOOLEAN },
  vellosFaciales: { allowNull: true, type: DataTypes.STRING },
  vellosAxilares: { allowNull: true, type: DataTypes.STRING },
  vellosPubi: { allowNull: true, type: DataTypes.STRING },
  vellosCorpo: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class PielAnexos extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "pielAnexosId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PIEL_ANEXOS_TABLE,
      modelName: "PielAnexos",
      timestamps: false,
    };
  }
}

module.exports = { PIEL_ANEXOS_TABLE, PielAnexosSchema, PielAnexos };
