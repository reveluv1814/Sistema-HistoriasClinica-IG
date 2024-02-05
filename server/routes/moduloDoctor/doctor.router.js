const express = require("express");

const PacienteService = require("../../services/paciente.service");
const CitaService = require("../../services/cita.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const { getPacienteSchema } = require("../../schemas/paciente.schema");
const {getCitaSchema,createCitaSchema,updateCitaSchema,} = require("../../schemas/cita.schema");

//inicializando
const router = express.Router();
const pacienteService = new PacienteService();
const citaService = new CitaService();

router.get(
  "/pacientes",
  checkRoles("admin", "doctor"),
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
  "/paciente:id",
  checkRoles("admin", "doctor"),
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
//lista todas las citas que debe atender el doctor
router.get(
  "/citas/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCitaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const citas = await citaService.findDoctor(id);

      res.json(citas);
    } catch (error) {
      next(error);
    }
  }
);
//elimina la cita que escoja el doctor
router.delete(
  "/cita/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCitaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await citaService.delete(id));
    } catch (error) {
      next(error);
    }
  }
);
//lista una cita 
router.get(
  "/cita/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCitaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const citas = await citaService.findConsultaDoc(id);

      res.json(citas);
    } catch (error) {
      next(error);
    }
  }
);
//edita una consulta
router.patch(
  "/cita/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCitaSchema, "params"),
  validatorHandlerObjetos(updateCitaSchema, "cita"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const cita = await citaService.update(id, body.cita);

      res.status(200).json(cita);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
