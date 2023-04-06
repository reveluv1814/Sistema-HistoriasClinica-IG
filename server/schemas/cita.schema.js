const Joi = require("joi");

const id = Joi.number().integer();
const fecha = Joi.date().required();
const hora = Joi.date().format("HH:mm").required();
const pacienteId = Joi.number().integer();
const doctorId = Joi.number().integer();
const personalAd_Id = Joi.number().integer();

const createCitaSchema = Joi.object({
  unidad: unidad.required(),
  especialidad: especialidad.required(),
  numeroMatricula: numeroMatricula.required(),
});

const updateCitaSchema = Joi.object({
  fecha,
  hora,
  pacienteId,
  doctorId,
  personalAd_Id,
});

const getCitaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCitaSchema, updateCitaSchema, getCitaSchema };
