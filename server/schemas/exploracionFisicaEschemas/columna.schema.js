const Joi = require("joi");

const id = Joi.number().integer();

const cifosis = Joi.boolean().optional().allow(null);
const escoliosis = Joi.boolean().optional().allow(null);
const lordosis = Joi.boolean().optional().allow(null);
const apendice = Joi.boolean().optional().allow(null);
const fovea = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createColumnaSchema = Joi.object({
  cifosis,
  escoliosis,
  lordosis,
  apendice,
  fovea,
  obs,
});

const updateColumnaSchema = Joi.object({
  cifosis,
  escoliosis,
  lordosis,
  apendice,
  fovea,
  obs,
});

const getColumnaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createColumnaSchema,
  updateColumnaSchema,
  getColumnaSchema,
};
