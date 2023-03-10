"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { USUARIO_TABLE, UsuarioSchema } = require("./../models/usuario.model");
const { PERSONA_TABLE, PersonaSchema } = require("./../models/persona.model");
const { DOCTOR_TABLE, DoctorSchema } = require("./../models/doctor.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(DOCTOR_TABLE, DoctorSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(DOCTOR_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
