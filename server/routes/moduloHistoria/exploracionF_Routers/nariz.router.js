const express = require("express");
const NarizService = require("./../../../services/exploracionF_Services/nariz.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createNarizSchema,getNarizSchema,updateNarizSchema} = require("./../../../schemas/exploracionFisicaSchemas/nariz.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const narizService = new NarizService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createNarizSchema, "nariz"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {nariz} = req.body;
        const nariz_create = await narizService.create(nariz,id );
  
        res.status(201).json(nariz_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getNarizSchema, "params"),
  validatorHandlerObjetos(updateNarizSchema, "nariz"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {nariz} = req.body;

      const nariz_update = await narizService.updateNariz(nariz, id);

      res.status(202).json(nariz_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getNarizSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await narizService.deleteNariz(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;