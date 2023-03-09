const Joi = require("joi");

const {
  createPersonaSchema,
  updatePersonaSchema,
} = require("./persona.schema");

const id = Joi.number().integer();
const unidad = Joi.string().min(4);
const especialidad = Joi.string().min(2);

const createDoctorSchema = Joi.object({
  unidad: unidad.required(),
  especialidad: especialidad.required(),
  persona: createPersonaSchema,
});

const updateDoctorSchema = Joi.object({
  unidad,
  especialidad,
  persona: updatePersonaSchema,
});

const getDoctorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDoctorSchema, updateDoctorSchema, getDoctorSchema };
