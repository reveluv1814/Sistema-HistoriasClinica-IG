const express = require("express");
const CuelloService = require("./../../../services/exploracionF_Services/cuello.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createCuelloSchema,getCuelloSchema,updateCuelloSchema} = require("./../../../schemas/exploracionFisicaSchemas/cuello.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const cuelloService = new CuelloService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createCuelloSchema, "cuello"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {cuello} = req.body;
        const cuello_create = await cuelloService.create(cuello,id );
  
        res.status(201).json(cuello_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCuelloSchema, "params"),
  validatorHandlerObjetos(updateCuelloSchema, "cuello"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {cuello} = req.body;

      const cuello_update = await cuelloService.updateCuello(cuello, id);

      res.status(202).json(cuello_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getCuelloSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await cuelloService.deleteCuello(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
