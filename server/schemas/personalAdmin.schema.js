const Joi = require("joi");

const id = Joi.number().integer();
const cargo = Joi.string().min(4);
const usuarioId = Joi.number().integer();
const personaId = Joi.number().integer();
//
const pacienteId = Joi.number().integer();
const personalAd_Id = Joi.number().integer();
const historiaId = Joi.string();

const createPersonalAdminSchema = Joi.object({
  cargo: cargo.required(),
});

const updatePersonalAdminSchema = Joi.object({
  cargo,
  usuarioId,
  personaId,
});

const getPersonalAdminSchema = Joi.object({
  id: id.required(),
});
//admin crea paciente
const addCreaPaciente = Joi.object({
  personalAd_Id: personalAd_Id.required(),
  /*pacienteId: pacienteId.required(), */
  /* historiaId: historiaId.required(), */
});

module.exports = {
  createPersonalAdminSchema,
  updatePersonalAdminSchema,
  getPersonalAdminSchema,
  addCreaPaciente,
};
