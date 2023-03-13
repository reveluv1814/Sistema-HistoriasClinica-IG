const Joi = require("joi");

const id = Joi.number().integer();
const especialidad = Joi.string().min(4);
const usuarioId = Joi.number().integer();
const personaId = Joi.number().integer();

const createLaboratoristaSchema = Joi.object({
  especialidad: especialidad.required(),
});

const updateLaboratoristaSchema = Joi.object({
  especialidad,
  usuarioId,
  personaId,
});

const getLaboratoristaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLaboratoristaSchema, updateLaboratoristaSchema, getLaboratoristaSchema };
