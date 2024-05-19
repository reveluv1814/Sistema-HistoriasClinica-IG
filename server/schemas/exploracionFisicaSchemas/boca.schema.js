const Joi = require("joi");

const id = Joi.number().integer();

const leporino = Joi.boolean().optional().allow(null);
const vol = Joi.boolean().optional().allow(null);
const fosetasInf = Joi.boolean().optional().allow(null);
const comisuras = Joi.boolean().optional().allow(null);
const microstomia = Joi.boolean().optional().allow(null);
const macrostomia = Joi.boolean().optional().allow(null);
const macroglosia = Joi.boolean().optional().allow(null);
const lenguaHendida = Joi.boolean().optional().allow(null);
const lenguaGeo = Joi.boolean().optional().allow(null);
const frenillo = Joi.boolean().optional().allow(null);
const altDental = Joi.boolean().optional().allow(null);
const fisuraPalatina = Joi.boolean().optional().allow(null);
const paladarOjival = Joi.boolean().optional().allow(null);
const paladarAlto= Joi.boolean().optional().allow(null);
const uvulaBifida = Joi.boolean().optional().allow(null);
const palpacionPaladar = Joi.boolean().optional().allow(null);
const obs = Joi.string().allow(null, "").optional();

const createBocaSchema = Joi.object({
  leporino,
  vol,
  fosetasInf,
  comisuras,
  microstomia,
  macrostomia,
  macroglosia,
  lenguaHendida,
  lenguaGeo,
  frenillo,
  altDental,
  fisuraPalatina,
  paladarOjival,
  paladarAlto,
  uvulaBifida,
  palpacionPaladar,
  obs,
});

const updateBocaSchema = Joi.object({
  leporino,
  vol,
  fosetasInf,
  comisuras,
  microstomia,
  macrostomia,
  macroglosia,
  lenguaHendida,
  lenguaGeo,
  frenillo,
  altDental,
  fisuraPalatina,
  paladarOjival,
  paladarAlto,
  uvulaBifida,
  palpacionPaladar,
  obs,
});

const getBocaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBocaSchema,
  updateBocaSchema,
  getBocaSchema,
};
