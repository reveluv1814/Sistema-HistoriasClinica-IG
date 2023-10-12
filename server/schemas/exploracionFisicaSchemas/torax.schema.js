const Joi = require("joi");

const id = Joi.number().integer();

const cajaPequeña = Joi.boolean().optional().allow(null);
const esternonCorto = Joi.boolean().optional().allow(null);
const escavado = Joi.boolean().optional().allow(null);
const quilla = Joi.boolean().optional().allow(null);
const mamasAnormales = Joi.boolean().optional().allow(null);
const politelia = Joi.boolean().optional().allow(null);
const defectosCostales = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();
const pulmones = Joi.string().allow(null, "").optional();
const cardioTa = Joi.number().optional().allow(null);
const cardioTaSobre = Joi.number().optional().allow(null);
const cardioFc = Joi.number().optional().allow(null);
const cardioBM = Joi.string().allow(null, "").optional();

const createToraxSchema = Joi.object({
  cajaPequeña,
  esternonCorto,
  escavado,
  quilla,
  mamasAnormales,
  politelia,
  defectosCostales,
  obs,
  pulmones,
  cardioTa,
  cardioTaSobre,
  cardioFc,
  cardioBM,
});

const updateToraxSchema = Joi.object({
  cajaPequeña,
  esternonCorto,
  escavado,
  quilla,
  mamasAnormales,
  politelia,
  defectosCostales,
  obs,
  pulmones,
  cardioTa,
  cardioTaSobre,
  cardioFc,
  cardioBM,
});

const getToraxSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createToraxSchema,
  updateToraxSchema,
  getToraxSchema,
};
