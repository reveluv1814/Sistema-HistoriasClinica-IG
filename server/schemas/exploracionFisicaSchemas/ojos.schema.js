const Joi = require("joi");

const id = Joi.number().integer();

const sinofiris = Joi.boolean().optional().allow(null);
const ptosis_p = Joi.boolean().optional().allow(null);
const estrabismo = Joi.boolean().optional().allow(null);
const convergente = Joi.boolean().optional().allow(null);
const divergente = Joi.boolean().optional().allow(null);
const infeccion = Joi.boolean().optional().allow(null);
const epifora = Joi.boolean().optional().allow(null);
const anoftalmina = Joi.boolean().optional().allow(null);
const microftalmina = Joi.boolean().optional().allow(null);
const hipertelorismo = Joi.boolean().optional().allow(null);
const epicanto = Joi.boolean().optional().allow(null);
const angulo_oblicuos = Joi.string().allow(null, "").optional();
const exoftalmina = Joi.boolean().optional().allow(null);
const nistagmus = Joi.boolean().optional().allow(null);
const escleras_azul = Joi.boolean().optional().allow(null);
const coloboma = Joi.boolean().optional().allow(null);
const aniridia = Joi.boolean().optional().allow(null);
const maculas_iris = Joi.boolean().optional().allow(null);
const catarata = Joi.boolean().optional().allow(null);
const leucoma = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createOjosSchema = Joi.object({
  sinofiris,
  ptosis_p,
  estrabismo,
  convergente,
  divergente,
  infeccion,
  epifora,
  anoftalmina,
  microftalmina,
  hipertelorismo,
  epicanto,
  angulo_oblicuos,
  exoftalmina,
  nistagmus,
  escleras_azul,
  coloboma,
  aniridia,
  maculas_iris,
  catarata,
  leucoma,
  obs,
});

const updateOjosSchema = Joi.object({
  sinofiris,
  ptosis_p,
  estrabismo,
  convergente,
  divergente,
  infeccion,
  epifora,
  anoftalmina,
  microftalmina,
  hipertelorismo,
  epicanto,
  angulo_oblicuos,
  exoftalmina,
  nistagmus,
  escleras_azul,
  coloboma,
  aniridia,
  maculas_iris,
  catarata,
  leucoma,
  obs,
});

const getOjosSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOjosSchema,
  updateOjosSchema,
  getOjosSchema,
};
