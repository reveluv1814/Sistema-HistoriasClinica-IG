const Joi = require("joi");

const id = Joi.number().integer();

const facies = Joi.string().allow(null, "").optional();
const motricidad = Joi.string().allow(null, "").optional();
const sencibilidad = Joi.string().allow(null, "").optional();
const coordinacion = Joi.string().allow(null, "").optional();
const movInvo = Joi.string().allow(null, "").optional();
const equilibrio = Joi.string().allow(null, "").optional();
const lenguaje = Joi.string().allow(null, "").optional();
const reflejos = Joi.string().allow(null, "").optional();
const paresCra = Joi.string().allow(null, "").optional();
const maniNeurovege = Joi.string().allow(null, "").optional();

const createExNeurologicoSchema = Joi.object({
  facies,
  motricidad,
  sencibilidad,
  coordinacion,
  movInvo,
  equilibrio,
  lenguaje,
  reflejos,
  paresCra,
  maniNeurovege,
});

const updateExNeurologicoSchema = Joi.object({
  facies,
  motricidad,
  sencibilidad,
  coordinacion,
  movInvo,
  equilibrio,
  lenguaje,
  reflejos,
  paresCra,
  maniNeurovege,
});

const getExNeurologicoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createExNeurologicoSchema,
  updateExNeurologicoSchema,
  getExNeurologicoSchema,
};
