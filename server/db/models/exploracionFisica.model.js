const { Model, DataTypes, Sequelize } = require("sequelize");

const { CRANEO_F_TABLE,} = require("./exploracionFisicaModels/craneoFacial.model");
const { OREJAS_TABLE } = require("./exploracionFisicaModels/orejas.model");
const { OJOS_TABLE } = require("./exploracionFisicaModels/ojos.model");
const { NARIZ_TABLE } = require("./exploracionFisicaModels/nariz.model");
const { MAX_MANDIBULA_TABLE,} = require("./exploracionFisicaModels/maxMandibula.model");
const { BOCA_TABLE } = require("./exploracionFisicaModels/boca.model");
const { CUELLO_TABLE } = require("./exploracionFisicaModels/cuello.model");
const { TORAX_TABLE } = require("./exploracionFisicaModels/torax.model");
const { COLUMNA_TABLE } = require("./exploracionFisicaModels/columna.model");
const { ABDOMEN_TABLE } = require("./exploracionFisicaModels/abdomen.model");
const { TEJIDO_SUB_TABLE,} = require("./exploracionFisicaModels/tejidoSub.model");
const { MUSCULATURA_TABLE,} = require("./exploracionFisicaModels/musculatura.model");
const { EX_NEUROLOGICO_TABLE,} = require("./exploracionFisicaModels/exNeurologico.model");
const { PIEL_ANEXOS_TABLE,} = require("./exploracionFisicaModels/pielAnexos.model");
const { GENITALES_EX_TABLE,} = require("./exploracionFisicaModels/genitalesEx.model");
const { MIEMBROS_TABLE,} = require("./exploracionFisicaModels/miembros.model");

const EXPLORACION_F_TABLE = "exploracionFisica";

const ExploracionFSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  peso_porcentaje: { allowNull: true, type: DataTypes.DOUBLE },
  peso: { allowNull: true, type: DataTypes.DOUBLE },
  talla: { allowNull: true, type: DataTypes.DOUBLE },
  talla_porcentaje: { allowNull: true, type: DataTypes.DOUBLE },
  pc: { allowNull: true, type: DataTypes.DOUBLE },
  pc_porcentaje: { allowNull: true, type: DataTypes.DOUBLE },
  pt: { allowNull: true, type: DataTypes.DOUBLE },
  pt_porcentaje: { allowNull: true, type: DataTypes.DOUBLE },
  envergadura: { allowNull: true, type: DataTypes.DOUBLE },
  dii: { allowNull: true, type: DataTypes.DOUBLE },
  dii_porcentaje: { allowNull: true, type: DataTypes.DOUBLE },
  seg_sup: { allowNull: true, type: DataTypes.DOUBLE },
  seg_inf: { allowNull: true, type: DataTypes.DOUBLE },
  distancia_inter: { allowNull: true, type: DataTypes.DOUBLE },
  bregma: { allowNull: true, type: DataTypes.DOUBLE },
  largo_manoD: { allowNull: true, type: DataTypes.DOUBLE },
  largo_dedoMD: { allowNull: true, type: DataTypes.DOUBLE },
  distancia_intercantal: { allowNull: true, type: DataTypes.DOUBLE },
  largo_manoI: { allowNull: true, type: DataTypes.DOUBLE },
  largo_dedoMI: { allowNull: true, type: DataTypes.DOUBLE },
  orejaD: { allowNull: true, type: DataTypes.DOUBLE },
  orejaI: { allowNull: true, type: DataTypes.DOUBLE },
  pieD: { allowNull: true, type: DataTypes.DOUBLE },
  pieI: { allowNull: true, type: DataTypes.DOUBLE },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  //agregar las ids foraneas
  craneoFId: {
    field: "craneoF_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CRANEO_F_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  orejasId: {
    field: "orejas_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: OREJAS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  ojosId: {
    field: "ojos_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: OJOS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  narizId: {
    field: "nariz_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: NARIZ_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  maxMandibulaId: {
    field: "maxMandibula_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: MAX_MANDIBULA_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  bocaId: {
    field: "boca_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: BOCA_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  cuelloId: {
    field: "cuello_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUELLO_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  toraxId: {
    field: "torax_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: TORAX_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  columnaId: {
    field: "columna_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: COLUMNA_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  abdomenId: {
    field: "abdomen_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: ABDOMEN_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  tejidoSubId: {
    field: "tejidoSub_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: TEJIDO_SUB_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  musculaturaId: {
    field: "musculatura_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: MUSCULATURA_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  exNeurologicoId: {
    field: "exNeurologico_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: EX_NEUROLOGICO_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  pielAnexosId: {
    field: "pielAnexos_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PIEL_ANEXOS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  genitalesExId: {
    field: "genitalesEx_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: GENITALES_EX_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  miembrosId: {
    field: "miembros_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: MIEMBROS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class ExploracionF extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.HistoriaClinica, {
      as: "historia",
      foreignKey: "exploracionFId",
    });
    //
    this.belongsTo(models.CraneoF, { as: "craneoF" });
    this.belongsTo(models.Orejas, { as: "orejas" });
    this.belongsTo(models.Ojos, { as: "ojos" });
    this.belongsTo(models.Nariz, { as: "nariz" });
    this.belongsTo(models.MaxMandibula, { as: "maxMandibula" });
    this.belongsTo(models.Boca, { as: "boca" });
    this.belongsTo(models.Cuello, { as: "cuello" });
    this.belongsTo(models.Torax, { as: "torax" });
    this.belongsTo(models.Columna, { as: "columna" });
    this.belongsTo(models.Abdomen, { as: "abdomen" });
    this.belongsTo(models.TejidoSub, { as: "tejidoSub" });
    this.belongsTo(models.Musculatura, { as: "musculatura" });
    this.belongsTo(models.ExNeurologico, { as: "exNeurologico" });
    this.belongsTo(models.PielAnexos, { as: "pielAnexos" });
    this.belongsTo(models.GenitalesEx, { as: "genitalesEx" });
    this.belongsTo(models.Miembros, { as: "miembros" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EXPLORACION_F_TABLE,
      modelName: "ExploracionF",
      timestamps: false,
    };
  }
}

module.exports = { EXPLORACION_F_TABLE, ExploracionFSchema, ExploracionF };
