const express = require("express");
const TejidoSubService = require("./../../../services/exploracionF_Services/tejidoSub.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createTejidoSubSchema,getTejidoSubSchema,updateTejidoSubSchema} = require("./../../../schemas/exploracionFisicaSchemas/tejidoSub.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const tejidoSubService = new TejidoSubService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createTejidoSubSchema, "tejidoSub"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {tejidoSub} = req.body;
        const tejidoSub_create = await tejidoSubService.create(tejidoSub,id );
  
        res.status(201).json(tejidoSub_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getTejidoSubSchema, "params"),
  validatorHandlerObjetos(updateTejidoSubSchema, "tejidoSub"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {tejidoSub} = req.body;

      const tejidoSub_update = await tejidoSubService.updateTejidoSub(tejidoSub, id);

      res.status(202).json(tejidoSub_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getTejidoSubSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await tejidoSubService.deleteTejidoSub(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;