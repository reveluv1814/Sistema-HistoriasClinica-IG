"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { USUARIO_TABLE, UsuarioSchema } = require("./../models/usuario.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
