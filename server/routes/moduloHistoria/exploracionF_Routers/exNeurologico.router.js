const express = require("express");
const ExNeurologicoService = require("./../../../services/exploracionF_Services/exNeurologico.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createExNeurologicoSchema,getExNeurologicoSchema,updateExNeurologicoSchema} = require("./../../../schemas/exploracionFisicaSchemas/exNeurologico.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const exNeurologicoService = new ExNeurologicoService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createExNeurologicoSchema, "exNeurologico"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {exNeurologico} = req.body;
        const exNeurologico_create = await exNeurologicoService.create(exNeurologico,id );
  
        res.status(201).json(exNeurologico_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getExNeurologicoSchema, "params"),
  validatorHandlerObjetos(updateExNeurologicoSchema, "exNeurologico"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {exNeurologico} = req.body;

      const exNeurologico_update = await exNeurologicoService.updateExNeurologico(exNeurologico, id);

      res.status(202).json(exNeurologico_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getExNeurologicoSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await exNeurologicoService.deleteExNeurologico(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;