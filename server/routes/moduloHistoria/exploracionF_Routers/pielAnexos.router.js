const express = require("express");
const PielAnexosService = require("./../../../services/exploracionF_Services/pielAnexos.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createPielAnexosSchema,getPielAnexosSchema,updatePielAnexosSchema} = require("./../../../schemas/exploracionFisicaSchemas/pielAnexos.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const pielAnexosService = new PielAnexosService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createPielAnexosSchema, "pielAnexos"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {pielAnexos} = req.body;
        const pielAnexos_create = await pielAnexosService.create(pielAnexos,id );
  
        res.status(201).json(pielAnexos_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getPielAnexosSchema, "params"),
  validatorHandlerObjetos(updatePielAnexosSchema, "pielAnexos"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {pielAnexos} = req.body;

      const pielAnexos_update = await pielAnexosService.updatePielAnexos(pielAnexos, id);

      res.status(202).json(pielAnexos_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getPielAnexosSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await pielAnexosService.deletePielAnexos(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;