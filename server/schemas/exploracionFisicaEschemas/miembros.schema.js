const Joi = require("joi");

const id = Joi.number().integer();

const supManosP = Joi.boolean().optional().allow(null);
const supBraquiactilia = Joi.boolean().optional().allow(null);
const supAracnodactilia = Joi.boolean().optional().allow(null);
const supPolidactilia = Joi.boolean().optional().allow(null);
const supTipoPoli = Joi.string().allow(null, "").optional();
const supSindactilia = Joi.boolean().optional().allow(null);
const supCutanea = Joi.boolean().optional().allow(null);
const supOsea = Joi.boolean().optional().allow(null);
const supDedos = Joi.string().allow(null, "").optional();
const supCavalgamiento = Joi.string().allow(null, "").optional();
const supDeformidad = Joi.boolean().optional().allow(null);
const supObs = Joi.string().allow(null, "").optional();
const infPiePeque = Joi.boolean().optional().allow(null);
const infPolidactilia = Joi.boolean().optional().allow(null);
const infImplantacion = Joi.string().allow(null, "").optional();
const infSindactilia = Joi.boolean().optional().allow(null);
const infCutanea = Joi.boolean().optional().allow(null);
const infOsea = Joi.boolean().optional().allow(null);
const infDedos = Joi.string().allow(null, "").optional();
const infCavo = Joi.boolean().optional().allow(null);
const infCalcaneo = Joi.boolean().optional().allow(null);
const infEquino = Joi.boolean().optional().allow(null);
const infVaro = Joi.boolean().optional().allow(null);
const infValgo = Joi.boolean().optional().allow(null);
const infPiePlano = Joi.boolean().optional().allow(null);
const infDistancia = Joi.boolean().optional().allow(null);
const infObs = Joi.string().allow(null, "").optional();
const artiLimitaciones = Joi.string().allow(null, "").optional();
const artiHiperex = Joi.string().allow(null, "").optional();
const artiContracion = Joi.string().allow(null, "").optional();

const createMiembrosSchema = Joi.object({
  supManosP,
  supBraquiactilia,
  supAracnodactilia,
  supPolidactilia,
  supTipoPoli,
  supSindactilia,
  supCutanea,
  supOsea,
  supDedos,
  supCavalgamiento,
  supDeformidad,
  supObs,
  infPiePeque,
  infPolidactilia,
  infImplantacion,
  infSindactilia,
  infCutanea,
  infOsea,
  infDedos,
  infCavo,
  infCalcaneo,
  infEquino,
  infVaro,
  infValgo,
  infPiePlano,
  infDistancia,
  infObs,
  artiLimitaciones,
  artiHiperex,
  artiContracion,
});

const updateMiembrosSchema = Joi.object({
  supManosP,
  supBraquiactilia,
  supAracnodactilia,
  supPolidactilia,
  supTipoPoli,
  supSindactilia,
  supCutanea,
  supOsea,
  supDedos,
  supCavalgamiento,
  supDeformidad,
  supObs,
  infPiePeque,
  infPolidactilia,
  infImplantacion,
  infSindactilia,
  infCutanea,
  infOsea,
  infDedos,
  infCavo,
  infCalcaneo,
  infEquino,
  infVaro,
  infValgo,
  infPiePlano,
  infDistancia,
  infObs,
  artiLimitaciones,
  artiHiperex,
  artiContracion,
});

const getMiembrosSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMiembrosSchema,
  updateMiembrosSchema,
  getMiembrosSchema,
};
