const express = require("express");
const AntecedentePService = require("./../../services/antecedentesP.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createAntecedentePSchema,getAntecedentePSchema,updateAntecedentePSchema} = require("./../../schemas/antecedentesP.schema");
const {getHistoriaSchema } = require("./../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const antecedentePService = new AntecedentePService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createAntecedentePSchema, "antecedenteP"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {antecedenteP} = req.body;
        const antecedenteP_create = await antecedentePService.create(antecedenteP,id );
  
        res.status(201).json(antecedenteP_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getAntecedentePSchema, "params"),
  validatorHandlerObjetos(updateAntecedentePSchema, "antecedenteP"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {antecedenteP} = req.body;

      const antecedenteP_update = await antecedentePService.updateAntecedenteP(antecedenteP, id);

      res.status(202).json(antecedenteP_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getAntecedentePSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await antecedentePService.deleteAntecedenteP(id));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
