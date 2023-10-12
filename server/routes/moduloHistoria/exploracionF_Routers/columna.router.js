const express = require("express");
const ColumnaService = require("./../../../services/exploracionF_Services/columna.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createColumnaSchema,getColumnaSchema,updateColumnaSchema} = require("./../../../schemas/exploracionFisicaSchemas/columna.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const columnaService = new ColumnaService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createColumnaSchema, "columna"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {columna} = req.body;
        const columna_create = await columnaService.create(columna,id );
  
        res.status(201).json(columna_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getColumnaSchema, "params"),
  validatorHandlerObjetos(updateColumnaSchema, "columna"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {columna} = req.body;

      const columna_update = await columnaService.updateColumna(columna, id);

      res.status(202).json(columna_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getColumnaSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await columnaService.deleteColumna(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;