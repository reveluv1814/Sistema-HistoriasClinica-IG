const Joi = require("joi");

const id = Joi.number().integer();

const espesor = Joi.string().allow(null, "").optional();
const turgor = Joi.string().allow(null, "").optional();
const edemaManos = Joi.boolean().optional().allow(null);
const edemaPies = Joi.boolean().optional().allow(null);
const edemaOtros = Joi.string().allow(null, "").optional();
const ganglios = Joi.string().allow(null, "").optional();
const obs = Joi.string().allow(null, "").optional();

const createTejidoSubSchema = Joi.object({
  espesor,
  turgor,
  edemaManos,
  edemaPies,
  edemaOtros,
  ganglios,
  obs,
});

const updateTejidoSubSchema = Joi.object({
  espesor,
  turgor,
  edemaManos,
  edemaPies,
  edemaOtros,
  ganglios,
  obs,
});

const getTejidoSubSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createTejidoSubSchema,
  updateTejidoSubSchema,
  getTejidoSubSchema,
};
