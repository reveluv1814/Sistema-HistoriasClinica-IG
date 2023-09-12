const { Model, DataTypes, Sequelize } = require("sequelize");

const EX_NEUROLOGICO_TABLE = "exNeurologico";

const ExNeurologicoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  facies: { allowNull: true, type: DataTypes.STRING },
  motricidad: { allowNull: true, type: DataTypes.STRING },
  sencibilidad: { allowNull: true, type: DataTypes.STRING },
  coordinacion: { allowNull: true, type: DataTypes.STRING },
  movInvo: { allowNull: true, type: DataTypes.STRING },
  equilibrio: { allowNull: true, type: DataTypes.STRING },
  lenguaje: { allowNull: true, type: DataTypes.STRING },
  reflejos: { allowNull: true, type: DataTypes.STRING },
  paresCra: { allowNull: true, type: DataTypes.STRING },
  maniNeurovege: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class ExNeurologico extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "exNeurologicoId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EX_NEUROLOGICO_TABLE,
      modelName: "ExNeurologico",
      timestamps: false,
    };
  }
}

module.exports = { EX_NEUROLOGICO_TABLE, ExNeurologicoSchema, ExNeurologico };
