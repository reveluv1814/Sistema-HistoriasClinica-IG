const express = require("express");

const PacienteService = require("../../services/paciente.service");
const PcreaPacService = require("../../services/p_creaPac.service");
const configureMulter = require("./../../libs/uploadImages");
const { config } = require("../../config/config");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const { addCreaPaciente } = require("../../schemas/personalAdmin.schema");
const {
  updatePersonaSchema,
  createPersonaSchema,
} = require("./../../schemas/persona.schema");
const {
  getPacienteSchema,
  createPacienteSchema,
  updatePacienteSchema,
} = require("../../schemas/paciente.schema");

//inicializando
const router = express.Router();
const pacienteService = new PacienteService();
const pcreaPacService = new PcreaPacService();

//configuracon de multer con las rutas y nombre, en este caso ruta doctor y nombre doctor
const upload = configureMulter(config.urlImagenes + "pacientes", "paciente");

router.get(
  "/",
  checkRoles("admin", "personalAdmin"),
  async (req, res, next) => {
    try {
      const pacientes = await pacienteService.find(req);
      res.json({
        pacientes,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getPacienteSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const paciente = await pacienteService.findOne(id);

      res.json({
        paciente,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  checkRoles("admin", "personalAdmin"),
  validatorHandlerObjetos(createPacienteSchema, "paciente"),
  validatorHandlerObjetos(createPersonaSchema, "persona"),
  validatorHandlerObjetos(addCreaPaciente, "personalAdmin"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const paciente = await pacienteService.create(body);

      res.status(201).json(paciente);
    } catch (error) {
      next(error);
    }
  }
);

///imagenes post
router.post(
  "/:id/foto",
  checkRoles("admin", "personalAdmin"),
  upload.single("fileHC"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await pacienteService.fotoPaciente(id, req.file);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);
//imagenes edit
router.post(
  "/:id/actualizar-foto",
  checkRoles("admin", "personalAdmin"),
  upload.single("fileHC"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await pacienteService.actualizarFotoPaciente(id, req.file);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getPacienteSchema, "params"),
  validatorHandlerObjetos(updatePacienteSchema, "paciente"),
  validatorHandlerObjetos(updatePersonaSchema, "persona"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const paciente = await pacienteService.update(id, body);

      res.status(201).json(paciente);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getPacienteSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await pacienteService.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
