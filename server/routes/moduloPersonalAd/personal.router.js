const express = require("express");

const PersonaService = require("./../../services/persona.service");
const PersonalAdminService = require("../../services/personalAdmin.service");
const PacienteService = require("../../services/paciente.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//
const {
  getPersonalAdminSchema,
  createPersonalAdminSchema,
  updatePersonalAdminSchema,
  addCreaPaciente,
} = require("../../schemas/personalAdmin.schema");
const {
  updatePersonaSchema,
  createPersonaSchema,
} = require("./../../schemas/persona.schema");
const {
  getPacienteSchema,
  createPacienteSchema,
  updatePacienteSchema,
} = require("../../schemas/paciente.schema");

const router = express.Router();

const personalAdminService = new PersonalAdminService();
const personaService = new PersonaService();
const pacienteService = new PacienteService();

router.get(
  "/pacientes",
  checkRoles("admin", "personalAdmin"),
  async (req, res, next) => {
    try {
      const pacientes = await pacienteService.find();
      res.json({
        pacientes,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/add-paciente",
  checkRoles("admin", "personalAdmin"),
  validatorHandlerObjetos(createPersonaSchema, "persona"),
  validatorHandlerObjetos(createPacienteSchema, "paciente"),
  validatorHandlerObjetos(addCreaPaciente, "personalAdmin"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPersona = await personaService.create(body.persona);

      const newPaciente = await pacienteService.create({
        ...body.paciente,
        personaId: newPersona.id,
      });
      const personalCrea = await personalAdminService.addPaciente({
        ...body.personalAdmin,
        pacienteId: newPaciente.id,
      });
      res.status(201).json({ newPersona, newPaciente, personalCrea });
    } catch (error) {
      next(error);
    }
  }
);

/* router.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-item",
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
); */

module.exports = router;
