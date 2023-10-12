const Joi = require("joi");

const id = Joi.number().integer();

const corto = Joi.boolean().optional().allow(null);
const quistes = Joi.boolean().optional().allow(null);
const fistula = Joi.boolean().optional().allow(null);
const colli = Joi.boolean().optional().allow(null);
const torticolis = Joi.boolean().optional().allow(null);
const tiroides = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createCuelloSchema = Joi.object({
  corto,
  quistes,
  fistula,
  colli,
  torticolis,
  tiroides,
  obs,
});

const updateCuelloSchema = Joi.object({
  corto,
  quistes,
  fistula,
  colli,
  torticolis,
  tiroides,
  obs,
});

const getCuelloSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCuelloSchema,
  updateCuelloSchema,
  getCuelloSchema,
};
