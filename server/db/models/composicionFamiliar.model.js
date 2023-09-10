const { Model, DataTypes, Sequelize } = require("sequelize");

const COMPOSICION_F_TABLE = "composicionFamiliar";
const { HISTORIA_TABLE } = require("./historia.model");

const ComposicionFSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  nrogestacion: { allowNull: true, type: DataTypes.INTEGER },
  nomHijo: { allowNull: true, type: DataTypes.STRING },
  sexo: { allowNull: true, type: DataTypes.STRING },
  fechanac: { allowNull: true, type: DataTypes.DATE },
  edad: {
    type: DataTypes.VIRTUAL,
    get() {
      const fechanac = new Date(this.getDataValue("fechanac"));
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechanac.getFullYear();
      const mes = hoy.getMonth() - fechanac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechanac.getDate())) {
        edad--;
      }
      return edad;
    },
  },
  obs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  historiaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: HISTORIA_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class ComposicionF extends Model {
  static associate(models) {
    //asociaciones
    this.belongsTo(models.HistoriaClinica, {
      as: "historia",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPOSICION_F_TABLE,
      modelName: "ComposicionF",
      timestamps: false,
    };
  }
}

module.exports = { COMPOSICION_F_TABLE, ComposicionFSchema, ComposicionF };
