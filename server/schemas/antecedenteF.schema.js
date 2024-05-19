const Joi = require("joi");

/* const id = Joi.number().integer();
const nomPadre = Joi.string();
const fechaNac_Padre = Joi.date();
const profesionPadre = Joi.string();
const nomMadre = Joi.string();
const fechaNac_Madre = Joi.date();
const profesionMadre = Joi.string();
const edadMat_nacP = Joi.number().integer();
const edadPat_nacP = Joi.number().integer();
const edadAbuela_nacM = Joi.number().integer(); */
//
const id = Joi.number().integer();
const nomPadre = Joi.string().allow(null, "").optional();
const fechaNac_Padre = Joi.date().allow(null).optional();
const profesionPadre = Joi.string().allow(null, "").optional();
const nomMadre = Joi.string().allow(null, "").optional();
const fechaNac_Madre = Joi.date().allow(null).optional();
const profesionMadre = Joi.string().allow(null, "").optional();
const edadMat_nacP = Joi.number().integer().allow(null).optional();
const edadPat_nacP = Joi.number().integer().allow(null).optional();
const edadAbuela_nacM = Joi.number().integer().allow(null).optional();

const createAntecedenteFSchema = Joi.object({
  nomPadre,
  fechaNac_Padre,
  profesionPadre,
  nomMadre,
  fechaNac_Madre,
  profesionMadre,
  edadMat_nacP,
  edadPat_nacP,
  edadAbuela_nacM,
});

const updateAntecedenteFSchema = Joi.object({
  nomPadre,
  fechaNac_Padre,
  profesionPadre,
  nomMadre,
  fechaNac_Madre,
  profesionMadre,
  edadMat_nacP,
  edadPat_nacP,
  edadAbuela_nacM,
});

const getAntecedenteFSchema = Joi.object({
  id: id.required(),
});

module.exports = { createAntecedenteFSchema, updateAntecedenteFSchema, getAntecedenteFSchema };
