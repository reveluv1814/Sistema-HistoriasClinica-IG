const express = require("express");
const GenitalesExService = require("./../../../services/exploracionF_Services/genitalesEx.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createGenitalesExSchema,getGenitalesExSchema,updateGenitalesExSchema} = require("./../../../schemas/exploracionFisicaSchemas/genitalesEx.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const genitalesExService = new GenitalesExService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createGenitalesExSchema, "genitalesEx"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {genitalesEx} = req.body;
        const genitalesEx_create = await genitalesExService.create(genitalesEx,id );
  
        res.status(201).json(genitalesEx_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getGenitalesExSchema, "params"),
  validatorHandlerObjetos(updateGenitalesExSchema, "genitalesEx"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {genitalesEx} = req.body;

      const genitalesEx_update = await genitalesExService.updateGenitalesEx(genitalesEx, id);

      res.status(202).json(genitalesEx_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getGenitalesExSchema, "genitalesEx"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await genitalesExService.deleteGenitalesEx(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;