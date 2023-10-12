const Joi = require("joi");

const id = Joi.number().integer();

const hipoplasiaMaxS = Joi.boolean().optional().allow(null);
const micrognatia = Joi.boolean().optional().allow(null);
const prognatismo = Joi.boolean().optional().allow(null);
const retronagtismo = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createMaxMandibulaSchema = Joi.object({
  hipoplasiaMaxS,
  micrognatia,
  prognatismo,
  retronagtismo,
  obs,
});

const updateMaxMandibulaSchema = Joi.object({
  hipoplasiaMaxS,
  micrognatia,
  prognatismo,
  retronagtismo,
  obs,
});

const getMaxMandibulaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMaxMandibulaSchema,
  updateMaxMandibulaSchema,
  getMaxMandibulaSchema,
};
