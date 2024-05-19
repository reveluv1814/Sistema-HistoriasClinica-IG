const { Model, DataTypes, Sequelize } = require("sequelize");

const ANTECEDENTE_F_TABLE = "antecedenteFamiliar";

const AntecedenteFSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nomPadre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fechaNac_Padre: { allowNull: true, type: DataTypes.DATE },
  profesionPadre: { allowNull: true, type: DataTypes.STRING },
  nomMadre: { allowNull: true, type: DataTypes.STRING },
  fechaNac_Madre: { allowNull: true, type: DataTypes.DATE },
  profesionMadre: { allowNull: true, type: DataTypes.STRING },
  edadMat_nacP: { allowNull: true, type: DataTypes.INTEGER },
  edadPat_nacP: { allowNull: true, type: DataTypes.INTEGER },
  edadAbuela_nacM: { allowNull: true, type: DataTypes.INTEGER },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class AntecedenteF extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.HistoriaClinica, {
      as: "historia",
      foreignKey: "antecedenteFId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ANTECEDENTE_F_TABLE,
      modelName: "AntecedentesF",
      timestamps: false,
    };
  }
}

module.exports = { ANTECEDENTE_F_TABLE, AntecedenteFSchema, AntecedenteF };
