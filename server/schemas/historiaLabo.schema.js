const Joi = require("joi");

const id = Joi.number().integer();
const examen = Joi.string().allow(null, "").optional();
const historiaId = Joi.number().integer();
const laboratoristaId = Joi.number().integer();

//

const getHistoriaLaboSchema = Joi.object({
  id: id.required(),
});

const createHistoriaLaboSchema = Joi.object({
  examen,
  historiaId,
  laboratoristaId: laboratoristaId.required(),
});

const updateHistoriaLaboSchema = Joi.object({
  examen,
});

module.exports = { getHistoriaLaboSchema, createHistoriaLaboSchema, updateHistoriaLaboSchema };
