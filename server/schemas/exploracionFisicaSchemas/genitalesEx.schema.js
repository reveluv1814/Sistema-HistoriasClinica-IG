const Joi = require("joi");

const id = Joi.number().integer();

const tanner = Joi.string().allow(null, "").optional();
const ambiguos = Joi.boolean().optional().allow(null);
const criptorquidea = Joi.boolean().optional().allow(null);
const testiculoRetractil = Joi.boolean().optional().allow(null);
const hipoMay = Joi.boolean().optional().allow(null);
const hipoMen = Joi.boolean().optional().allow(null);
const hipertrofiaClitoris = Joi.boolean().optional().allow(null);
const hidrocele = Joi.boolean().optional().allow(null);
const meato = Joi.boolean().optional().allow(null);
const peneal = Joi.boolean().optional().allow(null);
const peneoescrotal = Joi.boolean().optional().allow(null);
const perineal = Joi.boolean().optional().allow(null);
const epispadia = Joi.boolean().optional().allow(null);
const fimosis = Joi.boolean().optional().allow(null);
const tamanioPene = Joi.number().optional().allow(null);
const testiculoDMay = Joi.string().allow(null, "").optional();
const testiculoDMen = Joi.string().allow(null, "").optional();
const testiculoIMay = Joi.string().allow(null, "").optional();
const testiculoIMen = Joi.string().allow(null, "").optional();

const createGenitalesExSchema = Joi.object({
  tanner,
  ambiguos,
  criptorquidea,
  testiculoRetractil,
  hipoMay,
  hipoMen,
  hipertrofiaClitoris,
  hidrocele,
  meato,
  peneal,
  peneoescrotal,
  perineal,
  epispadia,
  fimosis,
  tamanioPene,
  testiculoDMay,
  testiculoDMen,
  testiculoIMay,
  testiculoIMen,
});

const updateGenitalesExSchema = Joi.object({
  tanner,
  ambiguos,
  criptorquidea,
  testiculoRetractil,
  hipoMay,
  hipoMen,
  hipertrofiaClitoris,
  hidrocele,
  meato,
  peneal,
  peneoescrotal,
  perineal,
  epispadia,
  fimosis,
  tamanioPene,
  testiculoDMay,
  testiculoDMen,
  testiculoIMay,
  testiculoIMen,
});

const getGenitalesExSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createGenitalesExSchema,
  updateGenitalesExSchema,
  getGenitalesExSchema,
};
