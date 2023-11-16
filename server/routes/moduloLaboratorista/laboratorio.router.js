const express = require("express");
const LaboratoristaService = require("./../../services/laboratorista.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {getLaboratoristaSchema} = require("./../../schemas/laboratorista.schema");

//inicializando
const router = express.Router();
const laboratoristaService = new LaboratoristaService();

router.get("/", checkRoles("admin","laboratorista"), async (req, res, next) => {
  try {
    const laboratoristas = await laboratoristaService.find(req);

    res.json({
      laboratoristas,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin","laboratorista"),
  validatorHandler(getLaboratoristaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const laboratorista = await laboratoristaService.findOne(id);

      res.json({
        laboratorista,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
