const Joi = require("joi");

const id = Joi.number().integer();
const especialidad = Joi.string().min(4);
const matriculaProf= Joi.string();
const usuarioId = Joi.number().integer();
const personaId = Joi.number().integer();

const createLaboratoristaSchema = Joi.object({
  especialidad: especialidad.required(),
  matriculaProf: matriculaProf.required(),
});

const updateLaboratoristaSchema = Joi.object({
  especialidad,
  usuarioId,
  personaId,
  matriculaProf,
});

const getLaboratoristaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLaboratoristaSchema, updateLaboratoristaSchema, getLaboratoristaSchema };
