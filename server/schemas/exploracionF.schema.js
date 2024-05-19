const Joi = require("joi");

const id = Joi.number().integer();
const peso_porcentaje = Joi.number().optional().allow(null);
const peso = Joi.number().optional().allow(null);
const talla = Joi.number().optional().allow(null);
const talla_porcentaje = Joi.number().optional().allow(null);
const pc = Joi.number().optional().allow(null);
const pc_porcentaje = Joi.number().optional().allow(null);
const pt = Joi.number().optional().allow(null);
const pt_porcentaje = Joi.number().optional().allow(null);
const envergadura = Joi.number().optional().allow(null);
const dii = Joi.number().optional().allow(null);
const dii_porcentaje = Joi.number().optional().allow(null);
const seg_sup = Joi.number().optional().allow(null);
const seg_inf = Joi.number().optional().allow(null);
const distancia_inter = Joi.number().optional().allow(null);
const bregma = Joi.number().optional().allow(null);
const largo_manoD = Joi.number().optional().allow(null);
const largo_dedoMD = Joi.number().optional().allow(null);
const distancia_intercantal = Joi.number().optional().allow(null);
const largo_manoI = Joi.number().optional().allow(null);
const largo_dedoMI = Joi.number().optional().allow(null);
const orejaD = Joi.number().optional().allow(null);
const orejaI = Joi.number().optional().allow(null);
const pieD = Joi.number().optional().allow(null);
const pieI = Joi.number().optional().allow(null);

const createExploracionFSchema = Joi.object({
  peso_porcentaje,
  peso,
  talla,
  talla_porcentaje,
  pc,
  pc_porcentaje,
  pt,
  pt_porcentaje,
  envergadura,
  dii,
  dii_porcentaje,
  seg_sup,
  seg_inf,
  distancia_inter,
  bregma,
  largo_manoD,
  largo_dedoMD,
  distancia_intercantal,
  largo_manoI,
  largo_dedoMI,
  orejaD,
  orejaI,
  pieD,
  pieI,
});

const updateExploracionFSchema = Joi.object({
  peso_porcentaje,
  peso,
  talla,
  talla_porcentaje,
  pc,
  pc_porcentaje,
  pt,
  pt_porcentaje,
  envergadura,
  dii,
  dii_porcentaje,
  seg_sup,
  seg_inf,
  distancia_inter,
  bregma,
  largo_manoD,
  largo_dedoMD,
  distancia_intercantal,
  largo_manoI,
  largo_dedoMI,
  orejaD,
  orejaI,
  pieD,
  pieI,
});

const getExploracionFSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createExploracionFSchema,
  updateExploracionFSchema,
  getExploracionFSchema,
};
