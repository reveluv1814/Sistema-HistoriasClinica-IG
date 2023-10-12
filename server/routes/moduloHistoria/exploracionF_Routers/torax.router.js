const express = require("express");
const ToraxService = require("./../../../services/exploracionF_Services/torax.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createToraxSchema,getToraxSchema,updateToraxSchema} = require("./../../../schemas/exploracionFisicaSchemas/torax.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const toraxService = new ToraxService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createToraxSchema, "torax"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {torax} = req.body;
        const torax_create = await toraxService.create(torax,id );
  
        res.status(201).json(torax_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getToraxSchema, "params"),
  validatorHandlerObjetos(updateToraxSchema, "torax"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {torax} = req.body;

      const torax_update = await toraxService.updateTorax(torax, id);

      res.status(202).json(torax_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getToraxSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await toraxService.deleteTorax(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;