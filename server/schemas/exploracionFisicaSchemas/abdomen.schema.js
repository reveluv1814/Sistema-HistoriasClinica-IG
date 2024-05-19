const Joi = require("joi");

const id = Joi.number().integer();

const herniaUmbilical = Joi.boolean().optional().allow(null);
const herniaInguinal = Joi.boolean().optional().allow(null);
const diastasis = Joi.boolean().optional().allow(null);
const tumoraciones = Joi.boolean().optional().allow(null);
const semiologia = Joi.string().allow(null, "").optional();
const obs = Joi.string().allow(null, "").optional();

const createAbdomenSchema = Joi.object({
  herniaUmbilical,
  herniaInguinal,
  diastasis,
  tumoraciones,
  semiologia,
  obs,
});

const updateAbdomenSchema = Joi.object({
  herniaUmbilical,
  herniaInguinal,
  diastasis,
  tumoraciones,
  semiologia,
  obs,
});

const getAbdomenSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createAbdomenSchema,
  updateAbdomenSchema,
  getAbdomenSchema,
};
