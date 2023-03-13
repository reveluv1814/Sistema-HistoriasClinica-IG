const Joi = require("joi");

const id = Joi.number().integer();
const cargo = Joi.string().min(4);
const usuarioId = Joi.number().integer();
const personaId = Joi.number().integer();

const createPersonalAdminSchema = Joi.object({
  cargo: cargo.required(),
});

const updatePersonalAdminSchema = Joi.object({
  cargo,
  usuarioId,
  personaId,
});

const getPersonalAdminSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPersonalAdminSchema, updatePersonalAdminSchema, getPersonalAdminSchema };
