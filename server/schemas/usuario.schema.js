const Joi = require("joi");

const { createDoctorSchema, updateDoctorSchema } = require('./doctor.schema');
const { createPersonaSchema, updatePersonaSchema } = require('./persona.schema');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(4);
const rol = Joi.string().min(2);

const createUsuarioSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  rol: rol.required(),
  doctor: createDoctorSchema.when('rol', { is: 'doctor', then: Joi.required() }),
  personal: createPersonaSchema.when('rol', { is: 'personal', then: Joi.required() }),
  //laboratorista: createLaboratoristaSchema.when('rol', { is: 'laboratorista', then: Joi.required() }),
});

const updateUsuarioSchema = Joi.object({
  email: email,
  password: password,
});

const getUsuarioSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema };
