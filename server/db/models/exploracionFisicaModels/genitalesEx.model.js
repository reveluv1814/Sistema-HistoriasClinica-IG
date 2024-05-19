const { Model, DataTypes, Sequelize } = require("sequelize");

const GENITALES_EX_TABLE = "genitalesEx";

const GenitalesExSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  tanner: { allowNull: true, type: DataTypes.STRING },
  ambiguos: { allowNull: true, type: DataTypes.BOOLEAN },
  criptorquidea: { allowNull: true, type: DataTypes.BOOLEAN },
  testiculoRetractil: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoMay: { allowNull: true, type: DataTypes.BOOLEAN },
  hipoMen: { allowNull: true, type: DataTypes.BOOLEAN },
  hipertrofiaClitoris: { allowNull: true, type: DataTypes.BOOLEAN },
  hidrocele: { allowNull: true, type: DataTypes.BOOLEAN },
  meato: { allowNull: true, type: DataTypes.BOOLEAN },
  peneal: { allowNull: true, type: DataTypes.BOOLEAN },
  peneoescrotal: { allowNull: true, type: DataTypes.BOOLEAN },
  perineal: { allowNull: true, type: DataTypes.BOOLEAN },
  epispadia: { allowNull: true, type: DataTypes.BOOLEAN },
  fimosis: { allowNull: true, type: DataTypes.BOOLEAN },
  tamanioPene: { allowNull: true, type: DataTypes.DOUBLE },
  testiculoDMay: { allowNull: true, type: DataTypes.STRING },
  testiculoDMen: { allowNull: true, type: DataTypes.STRING },
  testiculoIMay: { allowNull: true, type: DataTypes.STRING },
  testiculoIMen: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class GenitalesEx extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "genitalesExId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENITALES_EX_TABLE,
      modelName: "GenitalesEx",
      timestamps: false,
    };
  }
}

module.exports = { GENITALES_EX_TABLE, GenitalesExSchema, GenitalesEx };
