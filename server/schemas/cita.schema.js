const Joi = require("joi");

const id = Joi.number().integer();
const fecha = Joi.date();
const hora = Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/);
const pacienteId = Joi.number().integer();
const doctorId = Joi.number().integer();
const personalAdId = Joi.number().integer();
const motivo = Joi.string().optional().allow(null);
const resumen = Joi.string().optional().allow(null);
const impresionDiag = Joi.string().optional().allow(null);
const estado = Joi.boolean();

const createCitaSchema = Joi.object({
  fecha: fecha.required(),
  hora: hora.required(),
  pacienteId: pacienteId.required(),
  doctorId: doctorId.required(),
  personalAdId: personalAdId.required(),
  motivo: motivo.optional().allow(null),
  resumen: resumen.optional().allow(null), // Hacer que resumen sea opcional y permitir null
  impresionDiag: impresionDiag.optional().allow(null),
  estado: estado.required(),
});

const updateCitaSchema = Joi.object({
  fecha,
  hora,
  pacienteId,
  doctorId,
  personalAdId,
  motivo,
  resumen,
  impresionDiag,
  estado,
});

const getCitaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCitaSchema, updateCitaSchema, getCitaSchema };
