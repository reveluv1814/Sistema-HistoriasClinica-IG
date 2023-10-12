const Joi = require("joi");

const id = Joi.number().integer();

const puentenasal = Joi.boolean().optional().allow(null);
const stenosis = Joi.string().allow(null, "").optional();
const tabique = Joi.boolean().optional().allow(null);
const hipoplasis = Joi.boolean().optional().allow(null);
const narizProminente = Joi.boolean().optional().allow(null);
const tipoNariz = Joi.string().allow(null, "").optional();
const obs = Joi.string().allow(null, "").optional();

const createNarizSchema = Joi.object({
  puentenasal,
  stenosis,
  tabique,
  hipoplasis,
  narizProminente,
  tipoNariz,
  obs,
});

const updateNarizSchema = Joi.object({
  puentenasal,
  stenosis,
  tabique,
  hipoplasis,
  narizProminente,
  tipoNariz,
  obs,
});

const getNarizSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createNarizSchema,
  updateNarizSchema,
  getNarizSchema,
};
