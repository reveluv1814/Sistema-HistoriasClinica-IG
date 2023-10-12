const express = require("express");
const MiembrosService = require("../../../services/exploracionF_Services/miembros.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createMiembrosSchema,getMiembrosSchema,updateMiembrosSchema} = require("../../../schemas/exploracionFisicaSchemas/miembros.schema");
const {getHistoriaSchema } = require("../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const miembrosService = new MiembrosService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createMiembrosSchema, "miembros"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {miembros} = req.body;
        const miembro_create = await miembrosService.create(miembros,id );
  
        res.status(201).json(miembro_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getMiembrosSchema, "params"),
  validatorHandlerObjetos(updateMiembrosSchema, "miembros"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {miembros} = req.body;

      const miembro_update = await miembrosService.updateMiembro(miembros, id);

      res.status(202).json(miembro_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getMiembrosSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await miembrosService.deleteMiembro(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;