const Joi = require("joi");

const id = Joi.number().integer();

const microcefalia = Joi.boolean().optional().allow(null);
const macrocefalia = Joi.boolean().optional().allow(null);
const hidrocefalia = Joi.boolean().optional().allow(null);
const craneossino = Joi.boolean().optional().allow(null);
const occipital_p = Joi.boolean().optional().allow(null);
const prominente = Joi.boolean().optional().allow(null);
const abultamiento_f = Joi.boolean().optional().allow(null);
const glabela_p = Joi.boolean().optional().allow(null);
const asimetria_c = Joi.boolean().optional().allow(null);
const braquicefalia = Joi.boolean().optional().allow(null);
const aplasia_cuero = Joi.boolean().optional().allow(null);
const implantación_cabello = Joi.string().allow(null, "").optional();
const hipoplasia = Joi.boolean().optional().allow(null);
const suturas = Joi.boolean().optional().allow(null);
const suturas_des = Joi.string().allow(null, "").optional();
const facies = Joi.string().allow(null, "").optional();
const obs = Joi.string().allow(null, "").optional();

const createCraneoFSchema = Joi.object({
  microcefalia,
  macrocefalia,
  hidrocefalia,
  craneossino,
  occipital_p,
  prominente,
  abultamiento_f,
  glabela_p,
  asimetria_c,
  braquicefalia,
  aplasia_cuero,
  implantación_cabello,
  hipoplasia,
  suturas,
  suturas_des,
  facies,
  obs,
});

const updateCraneoFSchema = Joi.object({
  microcefalia,
  macrocefalia,
  hidrocefalia,
  craneossino,
  occipital_p,
  prominente,
  abultamiento_f,
  glabela_p,
  asimetria_c,
  braquicefalia,
  aplasia_cuero,
  implantación_cabello,
  hipoplasia,
  suturas,
  suturas_des,
  facies,
  obs,
});

const getCraneoFSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCraneoFSchema,
  updateCraneoFSchema,
  getCraneoFSchema,
};
