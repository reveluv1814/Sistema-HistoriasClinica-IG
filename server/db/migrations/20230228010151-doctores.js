"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { DOCTOR_TABLE, DoctorSchema } = require("./../models/doctor.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DOCTOR_TABLE, DoctorSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(DOCTOR_TABLE);
  },
};
