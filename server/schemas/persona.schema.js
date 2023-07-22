const Joi = require("joi");

const id = Joi.number().integer();
const nombre = Joi.string().min(2).max(100);
const apellidoMaterno = Joi.string().min(2).max(100);
const apellidoPaterno = Joi.string().min(2).max(100);
const telefono = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(6)
  .max(15);
const direccion = Joi.string().min(5).max(200);
const foto = Joi.string().uri();
const es_persona = Joi.boolean();
const ci = Joi.string().min(2).max(10);

const getPersonaSchema = Joi.object({
  id: id.required(),
});

const createPersonaSchema = Joi.object({
  nombre: nombre.required(),
  apellidoPaterno: apellidoPaterno.required(),
  apellidoMaterno: apellidoMaterno.required(),
  ci: ci.required(),
  telefono: telefono.required(),
  direccion: direccion.required(),
  foto: foto.optional(),
  es_persona: es_persona.required(),
});

const updatePersonaSchema = Joi.object({
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  ci,
  telefono,
  direccion,
  foto,
});

module.exports = { getPersonaSchema, createPersonaSchema, updatePersonaSchema };
