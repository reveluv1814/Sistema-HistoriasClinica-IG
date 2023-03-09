"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { PERSONA_TABLE, PersonaSchema } = require("./../models/persona.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(PERSONA_TABLE);
  },
};
