const express = require("express");
const BocaService = require("./../../../services/exploracionF_Services/boca.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createBocaSchema,getBocaSchema,updateBocaSchema} = require("./../../../schemas/exploracionFisicaSchemas/boca.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const bocaService = new BocaService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createBocaSchema, "boca"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {boca} = req.body;
        const boca_create = await bocaService.create(boca,id );
  
        res.status(201).json(boca_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getBocaSchema, "params"),
  validatorHandlerObjetos(updateBocaSchema, "boca"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {boca} = req.body;

      const boca_update = await bocaService.updateBoca(boca, id);

      res.status(202).json(boca_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getBocaSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await bocaService.deleteBoca(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
