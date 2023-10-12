const express = require("express");
const MusculaturaService = require("./../../../services/exploracionF_Services/musculatura.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createMusculaturaSchema,getMusculaturaSchema,updateMusculaturaSchema} = require("./../../../schemas/exploracionFisicaSchemas/musculatura.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const musculaturaService = new MusculaturaService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createMusculaturaSchema, "musculatura"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {musculatura} = req.body;
        const musculatura_create = await musculaturaService.create(musculatura,id );
  
        res.status(201).json(musculatura_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getMusculaturaSchema, "params"),
  validatorHandlerObjetos(updateMusculaturaSchema, "musculatura"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {musculatura} = req.body;

      const musculatura_update = await musculaturaService.updateMusculatura(musculatura, id);

      res.status(202).json(musculatura_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getMusculaturaSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await musculaturaService.deleteMusculatura(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;