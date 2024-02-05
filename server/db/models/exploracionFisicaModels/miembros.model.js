const { Model, DataTypes, Sequelize } = require("sequelize");

const MIEMBROS_TABLE = "miembros";

const MiembrosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  supManosP: { allowNull: true, type: DataTypes.BOOLEAN },
  supBraquiactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  supAracnodactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  supPolidactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  supTipoPoli: { allowNull: true, type: DataTypes.STRING },
  supSindactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  supCutanea: { allowNull: true, type: DataTypes.BOOLEAN },
  supOsea: { allowNull: true, type: DataTypes.BOOLEAN },
  supDedos: { allowNull: true, type: DataTypes.STRING },
  supPliegueSimeano:{ allowNull: true, type: DataTypes.BOOLEAN },
  supPliegueCompleto:{ allowNull: true, type: DataTypes.BOOLEAN },
  supPliegueImcompleto:{ allowNull: true, type: DataTypes.BOOLEAN },
  supPliegueQuinto:{ allowNull: true, type: DataTypes.BOOLEAN },
  supHipoplasia:{ allowNull: true, type: DataTypes.BOOLEAN },
  supClinodactilia:{ allowNull: true, type: DataTypes.BOOLEAN },
  supEspDedos:{ allowNull: true, type: DataTypes.STRING }, 
  supCavalgamiento: { allowNull: true, type: DataTypes.STRING },
  supDeformidad: { allowNull: true, type: DataTypes.BOOLEAN },
  supObs: { allowNull: true, type: DataTypes.STRING },
  infPiePeque: { allowNull: true, type: DataTypes.BOOLEAN },
  infPolidactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  infImplantacion: { allowNull: true, type: DataTypes.STRING },
  infSindactilia: { allowNull: true, type: DataTypes.BOOLEAN },
  infCutanea: { allowNull: true, type: DataTypes.BOOLEAN },
  infOsea: { allowNull: true, type: DataTypes.BOOLEAN },
  infDedos: { allowNull: true, type: DataTypes.STRING },
  infCavo: { allowNull: true, type: DataTypes.BOOLEAN },
  infCalcaneo: { allowNull: true, type: DataTypes.BOOLEAN },
  infEquino: { allowNull: true, type: DataTypes.BOOLEAN },
  infVaro: { allowNull: true, type: DataTypes.BOOLEAN },
  infValgo: { allowNull: true, type: DataTypes.BOOLEAN },
  infPiePlano: { allowNull: true, type: DataTypes.BOOLEAN },
  infDistancia: { allowNull: true, type: DataTypes.BOOLEAN },
  infObs: { allowNull: true, type: DataTypes.STRING },
  artiLimitaciones: { allowNull: true, type: DataTypes.STRING },
  artiHiperex: { allowNull: true, type: DataTypes.STRING },
  artiContracion: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Miembros extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.ExploracionF, {
      as: "exploracionF",
      foreignKey: "miembrosId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MIEMBROS_TABLE,
      modelName: "Miembros",
      timestamps: false,
    };
  }
}

module.exports = { MIEMBROS_TABLE, MiembrosSchema, Miembros };
