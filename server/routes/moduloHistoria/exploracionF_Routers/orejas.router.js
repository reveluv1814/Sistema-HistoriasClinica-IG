const express = require("express");
const OrejasService = require("./../../../services/exploracionF_Services/orejas.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createOrejasSchema,getOrejasSchema,updateOrejasSchema} = require("./../../../schemas/exploracionFisicaSchemas/orejas.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const orejasService = new OrejasService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createOrejasSchema, "orejas"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {orejas} = req.body;
        const orejas_create = await orejasService.create(orejas,id );
  
        res.status(201).json(orejas_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getOrejasSchema, "params"),
  validatorHandlerObjetos(updateOrejasSchema, "orejas"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {orejas} = req.body;

      const orejas_update = await orejasService.updateOrejas(orejas, id);

      res.status(202).json(orejas_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getOrejasSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await orejasService.deleteOrejas(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;