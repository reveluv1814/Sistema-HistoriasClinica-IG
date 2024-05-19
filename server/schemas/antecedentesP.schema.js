const Joi = require("joi");

const id = Joi.number().integer();
const g_embarazo = Joi.string().allow(null, "").optional();
const g_obs = Joi.string().allow(null, "").optional();
const pat_fiebre = Joi.boolean().optional().allow(null);
const pat_enfInfec = Joi.boolean().optional().allow(null);
const pat_diabetes = Joi.boolean().optional().allow(null);
const pat_epilepsia = Joi.boolean().optional().allow(null);
const pat_otras = Joi.string().allow(null, "").optional();
const factFis_rayosx = Joi.boolean().optional().allow(null);
const factFis_ecografia = Joi.boolean().optional().allow(null);
const factFis_lugar = Joi.string().allow(null, "").optional();
const factFis_numVeces = Joi.number().integer().allow(null).optional();
const factQuim_farmacos = Joi.string().allow(null, "").optional();
const factQuim_farmOtros = Joi.string().allow(null, "").optional();
const factQuim_anticonceptivos = Joi.string().allow(null, "").optional();
const fact_Quim_gestagenosAB = Joi.string().allow(null, "").optional();
const factQuim_expProfesional = Joi.string().allow(null, "").optional();
const factQuim_enolismo = Joi.string().allow(null, "").optional();
const gesta = Joi.number().integer().allow(null).optional();
const gesta_para = Joi.number().integer().allow(null).optional();
const gesta_nroNativivos = Joi.number().integer().allow(null).optional();
const gesta_malformados = Joi.number().integer().allow(null).optional();
const gesta_nroNatimortos = Joi.number().integer().allow(null).optional();
const gesta_nroAB = Joi.number().integer().allow(null).optional();
const gesta_exp = Joi.number().integer().allow(null).optional();
const gesta_anticonceptivos = Joi.boolean().optional().allow(null);
const gesta_anticonsTipo = Joi.string().allow(null, "").optional();
const gesta_periodo_1_2 = Joi.number().integer().allow(null).optional();
const gesta_periodo_2_3 = Joi.number().integer().allow(null).optional();
const gesta_periodo_3_4 = Joi.number().integer().allow(null).optional();
const gesta_periodoUso = Joi.string().allow(null, "").optional();
const parto = Joi.string().allow(null, "").optional();
const parto_porque = Joi.string().allow(null, "").optional();
const dn_peso = Joi.string().allow(null, "").optional();
const dn_talla = Joi.string().allow(null, "").optional();
const dn_pc = Joi.number().optional().allow(null);
const dn_apgar = Joi.string().allow(null, "").optional();
const dn_llanto = Joi.string().allow(null, "").optional();
const dn_oxigeno = Joi.string().allow(null, "").optional();
const dn_ictericia = Joi.string().allow(null, "").optional();
const dn_cianosis = Joi.string().allow(null, "").optional();
const dn_incubadora = Joi.string().allow(null, "").optional();
const dn_fotop = Joi.boolean().optional().allow(null);
const dn_exsanguineo = Joi.boolean().optional().allow(null);
const dn_exsan_fiebre = Joi.boolean().optional().allow(null);
const dn_exsan_convul = Joi.boolean().optional().allow(null);
const dn_hemorragia = Joi.boolean().optional().allow(null);
const dn_hemoIni = Joi.string().allow(null, "").optional();
const dn_hemoDura = Joi.string().allow(null, "").optional();
const dn_altCriptorquidea = Joi.boolean().optional().allow(null);
const dn_altCardiopatia = Joi.boolean().optional().allow(null);
const dn_altFlap = Joi.boolean().optional().allow(null);
const dn_altAnal = Joi.boolean().optional().allow(null);
const dn_altNeural = Joi.boolean().optional().allow(null);
const dn_altObs = Joi.string().allow(null, "").optional();

const createAntecedentePSchema = Joi.object({
  g_embarazo,
  g_obs,
  pat_fiebre,
  pat_enfInfec,
  pat_diabetes,
  pat_epilepsia,
  pat_otras,
  factFis_rayosx,
  factFis_ecografia,
  factFis_lugar,
  factFis_numVeces,
  factQuim_farmacos,
  factQuim_farmOtros,
  factQuim_anticonceptivos,
  fact_Quim_gestagenosAB,
  factQuim_expProfesional,
  factQuim_enolismo,
  gesta,
  gesta_para,
  gesta_nroNativivos,
  gesta_malformados,
  gesta_nroNatimortos,
  gesta_nroAB,
  gesta_exp,
  gesta_anticonceptivos,
  gesta_anticonsTipo,
  gesta_periodo_1_2,
  gesta_periodo_2_3,
  gesta_periodo_3_4,
  gesta_periodoUso,
  parto,
  parto_porque,
  dn_peso,
  dn_talla,
  dn_pc,
  dn_apgar,
  dn_llanto,
  dn_oxigeno,
  dn_ictericia,
  dn_cianosis,
  dn_incubadora,
  dn_fotop,
  dn_exsanguineo,
  dn_exsan_fiebre,
  dn_exsan_convul,
  dn_hemorragia,
  dn_hemoIni,
  dn_hemoDura,
  dn_altCriptorquidea,
  dn_altCardiopatia,
  dn_altFlap,
  dn_altAnal,
  dn_altNeural,
  dn_altObs,
});
const updateAntecedentePSchema = Joi.object({
  g_embarazo,
  g_obs,
  pat_fiebre,
  pat_enfInfec,
  pat_diabetes,
  pat_epilepsia,
  pat_otras,
  factFis_rayosx,
  factFis_ecografia,
  factFis_lugar,
  factFis_numVeces,
  factQuim_farmacos,
  factQuim_farmOtros,
  factQuim_anticonceptivos,
  fact_Quim_gestagenosAB,
  factQuim_expProfesional,
  factQuim_enolismo,
  gesta,
  gesta_para,
  gesta_nroNativivos,
  gesta_malformados,
  gesta_nroNatimortos,
  gesta_nroAB,
  gesta_exp,
  gesta_anticonceptivos,
  gesta_anticonsTipo,
  gesta_periodo_1_2,
  gesta_periodo_2_3,
  gesta_periodo_3_4,
  gesta_periodoUso,
  parto,
  parto_porque,
  dn_peso,
  dn_talla,
  dn_pc,
  dn_apgar,
  dn_llanto,
  dn_oxigeno,
  dn_ictericia,
  dn_cianosis,
  dn_incubadora,
  dn_fotop,
  dn_exsanguineo,
  dn_exsan_fiebre,
  dn_exsan_convul,
  dn_hemorragia,
  dn_hemoIni,
  dn_hemoDura,
  dn_altCriptorquidea,
  dn_altCardiopatia,
  dn_altFlap,
  dn_altAnal,
  dn_altNeural,
  dn_altObs,
});
const getAntecedentePSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createAntecedentePSchema,
  updateAntecedentePSchema,
  getAntecedentePSchema,
};
