const Joi = require("joi");

const id = Joi.number().integer();
const arbolGene = Joi.string();

const createHistoriaSchema = Joi.object({});

const updateHistoriaSchema = Joi.object({
  arbolGene,
});

const getHistoriaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createHistoriaSchema, updateHistoriaSchema, getHistoriaSchema };
