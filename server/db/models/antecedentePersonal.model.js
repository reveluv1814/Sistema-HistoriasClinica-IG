const { Model, DataTypes, Sequelize } = require("sequelize");

const ANTECEDENTE_P_TABLE = "antecedentePersonal";

const AntecedentePSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //
  g_embarazo: { allowNull: true, type: DataTypes.STRING },
  g_obs: { allowNull: true, type: DataTypes.STRING },
  pat_fiebre: { allowNull: true, type: DataTypes.BOOLEAN },
  pat_enfInfec: { allowNull: true, type: DataTypes.BOOLEAN },
  pat_diabetes: { allowNull: true, type: DataTypes.BOOLEAN },
  pat_epilepsia: { allowNull: true, type: DataTypes.BOOLEAN },
  pat_otras: { allowNull: true, type: DataTypes.STRING },
  factFis_rayosx: { allowNull: true, type: DataTypes.BOOLEAN },
  factFis_ecografia: { allowNull: true, type: DataTypes.BOOLEAN },
  factFis_lugar: { allowNull: true, type: DataTypes.STRING },
  factFis_numVeces: { allowNull: true, type: DataTypes.INTEGER },
  factQuim_farmacos: { allowNull: true, type: DataTypes.STRING },
  factQuim_farmOtros: { allowNull: true, type: DataTypes.STRING },
  factQuim_anticonceptivos: { allowNull: true, type: DataTypes.STRING },
  fact_Quim_gestagenosAB: { allowNull: true, type: DataTypes.STRING },
  factQuim_expProfesional: { allowNull: true, type: DataTypes.STRING },
  factQuim_enolismo: { allowNull: true, type: DataTypes.STRING },
  gesta: { allowNull: true, type: DataTypes.INTEGER },
  gesta_para: { allowNull: true, type: DataTypes.INTEGER },
  gesta_nroNativivos: { allowNull: true, type: DataTypes.INTEGER },
  gesta_malformados: { allowNull: true, type: DataTypes.INTEGER },
  gesta_nroNatimortos: { allowNull: true, type: DataTypes.INTEGER },
  gesta_nroAB: { allowNull: true, type: DataTypes.INTEGER },
  gesta_exp: { allowNull: true, type: DataTypes.INTEGER },
  gesta_anticonceptivos: { allowNull: true, type: DataTypes.BOOLEAN },
  gesta_anticonsTipo: { allowNull: true, type: DataTypes.STRING },
  gesta_periodo_1_2: { allowNull: true, type: DataTypes.INTEGER },
  gesta_periodo_2_3: { allowNull: true, type: DataTypes.INTEGER },
  gesta_periodo_3_4: { allowNull: true, type: DataTypes.INTEGER },
  gesta_periodoUso: { allowNull: true, type: DataTypes.STRING },
  parto: { allowNull: true, type: DataTypes.STRING },
  parto_porque: { allowNull: true, type: DataTypes.STRING },
  dn_peso: { allowNull: true, type: DataTypes.STRING },
  dn_talla: { allowNull: true, type: DataTypes.STRING },
  dn_pc: { allowNull: true, type: DataTypes.DOUBLE },
  dn_apgar: { allowNull: true, type: DataTypes.STRING },
  dn_llanto: { allowNull: true, type: DataTypes.STRING },
  dn_oxigeno: { allowNull: true, type: DataTypes.STRING },
  dn_ictericia: { allowNull: true, type: DataTypes.STRING },
  dn_cianosis: { allowNull: true, type: DataTypes.STRING },
  dn_incubadora: { allowNull: true, type: DataTypes.STRING },
  dn_fotop: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_exsanguineo: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_exsan_fiebre: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_exsan_convul: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_hemorragia: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_hemoIni: { allowNull: true, type: DataTypes.STRING },
  dn_hemoDura: { allowNull: true, type: DataTypes.STRING },
  dn_altCriptorquidea: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_altCardiopatia: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_altFlap: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_altAnal: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_altNeural: { allowNull: true, type: DataTypes.BOOLEAN },
  dn_altObs: { allowNull: true, type: DataTypes.STRING },
  //
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class AntecedenteP extends Model {
  static associate(models) {
    //asociaciones
    this.hasOne(models.HistoriaClinica, {
      as: "historia",
      foreignKey: "antecedentePId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ANTECEDENTE_P_TABLE,
      modelName: "AntecedentesP",
      timestamps: false,
    };
  }
}

module.exports = { ANTECEDENTE_P_TABLE, AntecedentePSchema, AntecedenteP };
