const express = require("express");
const AbdomenService = require("./../../../services/exploracionF_Services/abdomen.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createAbdomenSchema,getAbdomenSchema,updateAbdomenSchema} = require("./../../../schemas/exploracionFisicaSchemas/abdomen.schema");
const {getHistoriaSchema } = require("./../../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const abdomenService = new AbdomenService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createAbdomenSchema, "abdomen"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {abdomen} = req.body;
        const abdomen_create = await abdomenService.create(abdomen,id );
  
        res.status(201).json(abdomen_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getAbdomenSchema, "params"),
  validatorHandlerObjetos(updateAbdomenSchema, "abdomen"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {abdomen} = req.body;

      const abdomen_update = await abdomenService.updateAbdomen(abdomen, id);

      res.status(202).json(abdomen_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getAbdomenSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await abdomenService.deleteAbdomen(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;