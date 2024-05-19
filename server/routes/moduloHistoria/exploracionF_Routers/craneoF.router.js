const express = require("express");
const CraneoFService = require("./../../../services/exploracionF_Services/craneoF.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createCraneoFSchema,getCraneoFSchema,updateCraneoFSchema} = require("./../../../schemas/exploracionFisicaSchemas/craneoF.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const craneoFService = new CraneoFService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createCraneoFSchema, "craneoF"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {craneoF} = req.body;
        const craneoF_create = await craneoFService.create(craneoF,id );
  
        res.status(201).json(craneoF_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getCraneoFSchema, "params"),
  validatorHandlerObjetos(updateCraneoFSchema, "craneoF"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {craneoF} = req.body;

      const craneoF_update = await craneoFService.updateCraneoF(craneoF, id);

      res.status(202).json(craneoF_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getCraneoFSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await craneoFService.deleteCraneoF(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
