const Joi = require("joi");

const id = Joi.number().integer();
const fecha = Joi.date();
const hora = Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/);
const pacienteId = Joi.number().integer();
const doctorId = Joi.number().integer();
const personalAdId = Joi.number().integer();
const resumen = Joi.string();
const impresionDiag = Joi.string();
const estado = Joi.boolean();

const createCitaSchema = Joi.object({
  fecha: fecha.required(),
  hora: hora.required(),
  pacienteId: pacienteId.required(),
  doctorId: doctorId.required(),
  personalAdId: personalAdId.required(),
  resumen: resumen.required(),
  impresionDiag: impresionDiag.required(),
  estado: estado.required(),
});

const updateCitaSchema = Joi.object({
  fecha,
  hora,
  pacienteId,
  doctorId,
  personalAdId,
  resumen,
  impresionDiag,
  estado,
});

const getCitaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCitaSchema, updateCitaSchema, getCitaSchema };
