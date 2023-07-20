const express = require("express");
const LaboratoristaService = require("./../../services/laboratorista.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  updateUsuarioSchema,
  createUsuarioSchema,
} = require("./../../schemas/usuario.schema");
const {
  updatePersonaSchema,
  createPersonaSchema,
} = require("./../../schemas/persona.schema");
const {
  updateLaboratoristaSchema,
  createLaboratoristaSchema,
  getLaboratoristaSchema,
} = require("./../../schemas/laboratorista.schema");

//inicializando
const router = express.Router();
const laboratoristaService = new LaboratoristaService();

router.get("/", checkRoles("admin"), async (req, res, next) => {
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
  checkRoles("admin"),
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
router.post(
  "/",
  checkRoles("admin"),
  validatorHandlerObjetos(createUsuarioSchema, "usuario"),
  validatorHandlerObjetos(createPersonaSchema, "persona"),
  validatorHandlerObjetos(createLaboratoristaSchema, "laboratorista"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await laboratoristaService.create(body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getLaboratoristaSchema, "params"),
  validatorHandlerObjetos(updateUsuarioSchema, "usuario"),
  validatorHandlerObjetos(updatePersonaSchema, "persona"),
  validatorHandlerObjetos(updateLaboratoristaSchema, "doctor"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const laboratorista = await laboratoristaService.update(id, body);

      res.status(201).json(laboratorista);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getLaboratoristaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await laboratoristaService.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
