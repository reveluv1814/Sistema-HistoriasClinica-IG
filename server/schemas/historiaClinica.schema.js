const Joi = require("joi");

const id = Joi.number().integer();
const arbolGene = Joi.string();
const antecedenteFId = Joi.number().integer().allow(null).optional();
const antecedentePId = Joi.number().integer().allow(null).optional();
const exploracionFId = Joi.number().integer().allow(null).optional();

const createHistoriaSchema = Joi.object({
  antecedenteFId,
  antecedentePId,
  exploracionFId,
});

const updateHistoriaSchema = Joi.object({
  arbolGene,
});

const getHistoriaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createHistoriaSchema,
  updateHistoriaSchema,
  getHistoriaSchema,
};
