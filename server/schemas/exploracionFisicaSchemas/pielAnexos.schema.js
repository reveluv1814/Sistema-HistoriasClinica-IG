const Joi = require("joi");

const id = Joi.number().integer();

const pigmentacion = Joi.boolean().optional().allow(null);
const aumentoGen = Joi.boolean().optional().allow(null);
const disminucionGen = Joi.boolean().optional().allow(null);
const albinTotal = Joi.boolean().optional().allow(null);
const albinParcial = Joi.boolean().optional().allow(null);
const vitiligo = Joi.boolean().optional().allow(null);
const manchasCL = Joi.boolean().optional().allow(null);
const maculas = Joi.boolean().optional().allow(null);
const otrasManchas = Joi.boolean().optional().allow(null);
const hemanTela = Joi.boolean().optional().allow(null);
const alopesiaGen = Joi.boolean().optional().allow(null);
const alopesiaPar = Joi.boolean().optional().allow(null);
const irsutismo = Joi.boolean().optional().allow(null);
const hipoDisManos = Joi.boolean().optional().allow(null);
const hipoDisPies = Joi.boolean().optional().allow(null);
const hipoDisTumo = Joi.boolean().optional().allow(null);
const vellosFaciales = Joi.string().allow(null, "").optional();
const vellosAxilares = Joi.string().allow(null, "").optional();
const vellosPubi = Joi.string().allow(null, "").optional();
const vellosCorpo = Joi.string().allow(null, "").optional();

const createPielAnexosSchema = Joi.object({
  pigmentacion,
  aumentoGen,
  disminucionGen,
  albinTotal,
  albinParcial,
  vitiligo,
  manchasCL,
  maculas,
  otrasManchas,
  hemanTela,
  alopesiaGen,
  alopesiaPar,
  irsutismo,
  hipoDisManos,
  hipoDisPies,
  hipoDisTumo,
  vellosFaciales,
  vellosAxilares,
  vellosPubi,
  vellosCorpo,
});

const updatePielAnexosSchema = Joi.object({
  pigmentacion,
  aumentoGen,
  disminucionGen,
  albinTotal,
  albinParcial,
  vitiligo,
  manchasCL,
  maculas,
  otrasManchas,
  hemanTela,
  alopesiaGen,
  alopesiaPar,
  irsutismo,
  hipoDisManos,
  hipoDisPies,
  hipoDisTumo,
  vellosFaciales,
  vellosAxilares,
  vellosPubi,
  vellosCorpo,
});

const getPielAnexosSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPielAnexosSchema,
  updatePielAnexosSchema,
  getPielAnexosSchema,
};
