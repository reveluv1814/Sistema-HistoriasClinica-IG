const express = require("express");
const MaxMandibulaService = require("./../../../services/exploracionF_Services/maxMandibula.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createMaxMandibulaSchema,getMaxMandibulaSchema,updateMaxMandibulaSchema} = require("./../../../schemas/exploracionFisicaSchemas/maxMandibula.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const maxMandibulaService = new MaxMandibulaService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createMaxMandibulaSchema, "maxMandibula"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {maxMandibula} = req.body;
        const maxMandibula_create = await maxMandibulaService.create(maxMandibula,id );
  
        res.status(201).json(maxMandibula_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getMaxMandibulaSchema, "params"),
  validatorHandlerObjetos(updateMaxMandibulaSchema, "maxMandibula"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {maxMandibula} = req.body;

      const maxMandibula_update = await maxMandibulaService.updateMaxMandibula(maxMandibula, id);

      res.status(202).json(maxMandibula_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getMaxMandibulaSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await maxMandibulaService.deleteMaxMandibula(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;