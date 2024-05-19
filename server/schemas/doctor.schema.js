const Joi = require("joi");

const id = Joi.number().integer();
const unidad = Joi.string().min(4);
const especialidad = Joi.string().min(2);
const numeroMatricula = Joi.string();
const usuarioId = Joi.number().integer();
const personaId = Joi.number().integer();

const createDoctorSchema = Joi.object({
  unidad: unidad.required(),
  especialidad: especialidad.required(),
  numeroMatricula: numeroMatricula.required(),
});

const updateDoctorSchema = Joi.object({
  unidad,
  especialidad,
  numeroMatricula,
  usuarioId,
  personaId,
});

const getDoctorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDoctorSchema, updateDoctorSchema, getDoctorSchema };
