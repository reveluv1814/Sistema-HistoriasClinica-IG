const Joi = require("joi");

const fechanac = Joi.number().date();//.timestamp()
const sexo = Joi.string();
const raza = Joi.string();
const procedencia = Joi.string();
const residencia = Joi.string();
const personaId = Joi.number().integer();
const personalAd_Id = Joi.number().integer();


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
  personalAd_Id
});

module.exports = { getPacienteSchema, createPacienteSchema, updatePacienteSchema };
