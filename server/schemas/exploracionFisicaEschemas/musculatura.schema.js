const Joi = require("joi");

const id = Joi.number().integer();

const normotrofica = Joi.boolean().optional().allow(null);
const hipotrofica = Joi.boolean().optional().allow(null);
const hipertrofica = Joi.boolean().optional().allow(null);
const normotonica = Joi.boolean().optional().allow(null);
const hipotonica = Joi.boolean().optional().allow(null);
const hipertonica = Joi.boolean().optional().allow(null);
const fuerzaMus = Joi.string().allow(null, "").optional();
const agenesia = Joi.boolean().optional().allow(null);
const agenesiaEspeci = Joi.string().allow(null, "").optional();
const obs = Joi.string().allow(null, "").optional();

const createMusculaturaSchema = Joi.object({
  normotrofica,
  hipotrofica,
  hipertrofica,
  normotonica,
  hipotonica,
  hipertonica,
  fuerzaMus,
  agenesia,
  agenesiaEspeci,
  obs,
});

const updateMusculaturaSchema = Joi.object({
  normotrofica,
  hipotrofica,
  hipertrofica,
  normotonica,
  hipotonica,
  hipertonica,
  fuerzaMus,
  agenesia,
  agenesiaEspeci,
  obs,
});

const getMusculaturaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMusculaturaSchema,
  updateMusculaturaSchema,
  getMusculaturaSchema,
};
