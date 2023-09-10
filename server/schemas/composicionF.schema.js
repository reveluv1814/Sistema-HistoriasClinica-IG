const Joi = require("joi");

const id = Joi.number().integer();
const nrogestacion = Joi.number().integer().allow(null).optional();
const nomHijo = Joi.string().allow(null, "").optional();
const sexo = Joi.string().allow(null, "").optional();
const fechanac = Joi.date().allow(null).optional();
const obs = Joi.string().allow(null, "").optional();
const historiaId = Joi.number().integer();

const createComposicionFSchema = Joi.object({
  nrogestacion,
  nomHijo,
  sexo,
  fechanac,
  obs,
  historiaId: historiaId.required(),
});

const updateComposicionFSchema = Joi.object({
  nrogestacion,
  nomHijo,
  sexo,
  fechanac,
  obs,
});

const getComposicionFSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createComposicionFSchema,
  updateComposicionFSchema,
  getComposicionFSchema,
};
