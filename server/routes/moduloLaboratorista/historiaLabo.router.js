const express = require("express");
const HistoriaLaboService = require("../../services/historiaLabo.service");
const LaboratoristaService = require("../../services/laboratorista.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  getHistoriaLaboSchema,
  createHistoriaLaboSchema,
  updateHistoriaLaboSchema,
} = require("../../schemas/historiaLabo.schema");
const { getHistoriaSchema } = require("../../schemas/historiaClinica.schema");
const { getLaboratoristaSchema } = require("../../schemas/laboratorista.schema");

//inicializando
const router = express.Router();
const historiaLaboService = new HistoriaLaboService();
const laboratoristaService = new LaboratoristaService();

router.post(
  "/:id",
  checkRoles("admin", "laboratorista"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createHistoriaLaboSchema, "historiaLabo"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { historiaLabo } = req.body;
      const historiaLaboCreate = await historiaLaboService.createHistoriaLabo(
        historiaLabo,
        id
      );

      res.status(201).json(historiaLaboCreate);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/nombre/:id",
  checkRoles("admin", "personalAdmin", "doctor", "laboratorista"),
  validatorHandler(getLaboratoristaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const laboratorista = await laboratoristaService.findNombre(id);

      res.json({
        laboratorista,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "laboratorista"),
  validatorHandler(getHistoriaLaboSchema, "params"),
  validatorHandlerObjetos(updateHistoriaLaboSchema, "historiaLabo"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { historiaLabo } = req.body;

      const historiaLabo_update = await historiaLaboService.updateHistoriaLabo(
        historiaLabo,
        id
      );

      res.status(202).json(historiaLabo_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin", "laboratorista"),
  validatorHandler(getHistoriaLaboSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await historiaLaboService.deleteHistoriaLabo(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
