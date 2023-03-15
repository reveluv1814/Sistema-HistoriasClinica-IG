"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { PERSONAL_ADMIN_TABLE, PersonalAdminSchema } = require("./../models/personalAdmin.model");
const { LABORATORISTA_TABLE, LaboratoristaSchema } = require("./../models/laboratorista.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PERSONAL_ADMIN_TABLE, PersonalAdminSchema);
    await queryInterface.createTable(LABORATORISTA_TABLE, LaboratoristaSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(LABORATORISTA_TABLE);
    await queryInterface.dropTable(PERSONAL_ADMIN_TABLE);
  },
};
