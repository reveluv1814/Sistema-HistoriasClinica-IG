const express = require("express");
const OjosService = require("./../../../services/exploracionF_Services/ojos.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createOjosSchema,getOjosSchema,updateOjosSchema} = require("./../../../schemas/exploracionFisicaSchemas/ojos.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const ojosService = new OjosService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createOjosSchema, "ojos"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {ojos} = req.body;
        const ojos_create = await ojosService.create(ojos,id );
  
        res.status(201).json(ojos_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getOjosSchema, "params"),
  validatorHandlerObjetos(updateOjosSchema, "ojos"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {ojos} = req.body;

      const ojos_update = await ojosService.updateOjos(ojos, id);

      res.status(202).json(ojos_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getOjosSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await ojosService.deleteOjos(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;