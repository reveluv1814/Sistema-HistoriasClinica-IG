const express = require("express");
const ComposicionFService = require("./../../services/composicionF.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createComposicionFSchema,getComposicionFSchema,updateComposicionFSchema} = require("./../../schemas/composicionF.schema");
const {getHistoriaSchema } = require("./../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const composicionFService = new ComposicionFService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createComposicionFSchema, "composicionF"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {composicionF} = req.body;
        const composicionF_create = await composicionFService.create(composicionF,id );
  
        res.status(201).json(composicionF_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getComposicionFSchema, "params"),
  validatorHandlerObjetos(updateComposicionFSchema, "composicionF"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {composicionF} = req.body;

      const composicionF_update = await composicionFService.updateComposicionF(composicionF, id);

      res.status(202).json(composicionF_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getComposicionFSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await composicionFService.deleteComposicionF(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
