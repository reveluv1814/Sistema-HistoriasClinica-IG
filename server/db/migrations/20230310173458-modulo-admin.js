"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { USUARIO_TABLE, UsuarioSchema } = require("./../models/usuario.model");
const { PERSONA_TABLE, PersonaSchema } = require("./../models/persona.model");
const { DOCTOR_TABLE, DoctorSchema } = require("./../models/doctor.model");
const {
  PERSONAL_ADMIN_TABLE,
  PersonalAdminSchema,
} = require("./../models/personalAdmin.model");
const {
  LABORATORISTA_TABLE,
  LaboratoristaSchema,
} = require("./../models/laboratorista.model");
const {
  PACIENTE_TABLE,
  PacienteSchema,
} = require("./../models/paciente.model");
const { CITA_TABLE, CitaSchema } = require("./../models/cita.model");
const {
  PCREA_PAC_TABLE,
  P_creaPacSchema,
} = require("./../models/p_creaPac.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(DOCTOR_TABLE, DoctorSchema);
    await queryInterface.createTable(PERSONAL_ADMIN_TABLE, PersonalAdminSchema);
    await queryInterface.createTable(LABORATORISTA_TABLE, LaboratoristaSchema);
    await queryInterface.createTable(PACIENTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fechanac: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      sexo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      raza: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      procedencia: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      residencia: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "create_at",
        defaultValue: Sequelize.NOW,
      },
      personaId: {
        field: "persona_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: PERSONA_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.createTable(CITA_TABLE, CitaSchema);
    await queryInterface.createTable(PCREA_PAC_TABLE, P_creaPacSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(CITA_TABLE);
    await queryInterface.dropTable(PACIENTE_TABLE);
    await queryInterface.dropTable(LABORATORISTA_TABLE);
    await queryInterface.dropTable(PERSONAL_ADMIN_TABLE);
    await queryInterface.dropTable(DOCTOR_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(PCREA_PAC_TABLE);
  },
};
