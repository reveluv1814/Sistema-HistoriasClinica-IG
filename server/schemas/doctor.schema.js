const Joi = require("joi");

const id = Joi.number().integer();
const unidad = Joi.string().min(4);

const createDoctorSchema = Joi.object({
  unidad: unidad.required(),
  
});

const updateDoctorSchema = Joi.object({
  unidad,
});

const getDoctorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDoctorSchema, updateDoctorSchema, getDoctorSchema };
