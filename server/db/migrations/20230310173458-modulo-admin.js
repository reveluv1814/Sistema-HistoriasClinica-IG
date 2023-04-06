"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { USUARIO_TABLE, UsuarioSchema } = require("./../models/usuario.model");
const { PERSONA_TABLE, PersonaSchema } = require("./../models/persona.model");
const { DOCTOR_TABLE, DoctorSchema } = require("./../models/doctor.model");
const { PERSONAL_ADMIN_TABLE, PersonalAdminSchema } = require("./../models/personalAdmin.model");
const { LABORATORISTA_TABLE, LaboratoristaSchema } = require("./../models/laboratorista.model");
const { PACIENTE_TABLE, PacienteSchema } = require("./../models/paciente.model");
const { CITA_TABLE, CitaSchema } = require("./../models/cita.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(DOCTOR_TABLE, DoctorSchema);
    await queryInterface.createTable(PERSONAL_ADMIN_TABLE, PersonalAdminSchema);
    await queryInterface.createTable(LABORATORISTA_TABLE, LaboratoristaSchema);
    await queryInterface.createTable(PACIENTE_TABLE, PacienteSchema);
    await queryInterface.createTable(CITA_TABLE, CitaSchema);

  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(CITA_TABLE);
    await queryInterface.dropTable(PACIENTE_TABLE);
    await queryInterface.dropTable(LABORATORISTA_TABLE);
    await queryInterface.dropTable(PERSONAL_ADMIN_TABLE);
    await queryInterface.dropTable(DOCTOR_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
