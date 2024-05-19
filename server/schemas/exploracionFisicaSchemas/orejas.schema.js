const Joi = require("joi");

const id = Joi.number().integer();

const implantacion = Joi.string().allow(null, "").optional();
const microtia = Joi.boolean().optional().allow(null);
const pabellon_mal = Joi.boolean().optional().allow(null);
const apendice = Joi.boolean().optional().allow(null);
const auriculares = Joi.boolean().optional().allow(null);
const ausencia_cae = Joi.boolean().optional().allow(null);
const estenosis_cae = Joi.boolean().optional().allow(null);
const fistula = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createOrejasSchema = Joi.object({
  implantacion,
  microtia,
  pabellon_mal,
  apendice,
  auriculares,
  ausencia_cae,
  estenosis_cae,
  fistula,
  obs,
});

const updateOrejasSchema = Joi.object({
  implantacion,
  microtia,
  pabellon_mal,
  apendice,
  auriculares,
  ausencia_cae,
  estenosis_cae,
  fistula,
  obs,
});

const getOrejasSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrejasSchema,
  updateOrejasSchema,
  getOrejasSchema,
};
