const Joi = require("joi");

const id = Joi.number().integer();
const nomPadre = Joi.string();
const fechaNac_Padre = Joi.date();
const profesionPadre = Joi.string();
const nomMadre = Joi.string();
const fechaNac_Madre = Joi.date();
const profesionMadre = Joi.string();
const edadMat_nacP = Joi.number().integer();
const edadPat_nacP = Joi.number().integer();
const edadAbuela_nacM = Joi.number().integer();

const createAntecedenteFSchema = Joi.object({
  nomPadre: nomPadre.required(),
  fechaNac_Padre: fechaNac_Padre.required(),
  profesionPadre: profesionPadre.required(),
  nomMadre: nomMadre.required(),
  fechaNac_Madre: fechaNac_Madre.required(),
  profesionMadre: profesionMadre.required(),
  edadMat_nacP: edadMat_nacP.required(),
  edadPat_nacP: edadPat_nacP.required(),
  edadAbuela_nacM: edadAbuela_nacM.required(),
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
