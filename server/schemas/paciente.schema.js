const Joi = require("joi");

const id = Joi.number().integer();
const fechanac = Joi.date();
const sexo = Joi.string();
const raza = Joi.string();
const procedencia = Joi.string();
const residencia = Joi.string();
const personaId = Joi.number().integer();

const getPacienteSchema = Joi.object({
  id: id.required(),
});

const createPacienteSchema = Joi.object({
  fechanac: fechanac.required(),
  sexo: sexo.required(),
  raza: raza.required(),
  procedencia: procedencia.required(),
  residencia: residencia.required(),
});

const updatePacienteSchema = Joi.object({
  fechanac,
  sexo,
  raza,
  procedencia,
  residencia,
  personaId,
});

module.exports = { getPacienteSchema, createPacienteSchema, updatePacienteSchema };
