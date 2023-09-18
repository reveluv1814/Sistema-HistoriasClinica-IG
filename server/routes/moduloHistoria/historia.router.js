const express = require("express");

const HistoriaService = require("../../services/historia.service");
//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {getHistoriaSchema,createHistoriaSchema,updateHistoriaSchema} = require("../../schemas/historiaClinica.schema");
//inicializando
const router = express.Router();
const historiaService = new HistoriaService();

router.get(
  "/:id",
  checkRoles("admin", "personalAdmin","doctor","laboratorista"),
  validatorHandler(getHistoriaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historia = await historiaService.findPacHis(id);
      res.json({
        historia,
      });
    } catch (error) {
      next(error);
    }
  }
);
/* router.get(
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
router.get(
  "/personalAd/:id",
  checkRoles("admin", "personalAdmin"),
  validatorHandler(getCitaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const citas = await citaService.findPersonal(id);

      res.json(citas);
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
); */

module.exports = router;
