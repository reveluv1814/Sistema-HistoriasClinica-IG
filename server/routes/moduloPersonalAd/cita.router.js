const express = require("express");

const CitaService = require("../../services/cita.service");
//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  getCitaSchema,
  createCitaSchema,
  updateCitaSchema,
} = require("../../schemas/cita.schema");
//inicializando
const router = express.Router();
const citaService = new CitaService();

router.get(
  "/",
  checkRoles("admin", "personalAdmin"),
  async (req, res, next) => {
    try {
      const citas = await citaService.find();
      res.json({
        citas,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getCitaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cita = await citaService.findOne(id);

      res.json(cita);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  checkRoles("admin", "personalAdmin"),
  validatorHandlerObjetos(createCitaSchema, "cita"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const cita = await citaService.create(body);

      res.status(201).json(cita);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getCitaSchema, "params"),
  validatorHandlerObjetos(updateCitaSchema, "cita"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const cita = await citaService.update(id, body.cita);

      res.status(201).json(cita);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin", "personalAdmin"),
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

module.exports = router;
