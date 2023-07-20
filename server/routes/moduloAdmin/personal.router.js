const express = require("express");
const PersonalService = require("./../../services/personalAdmin.service");

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
  updatePersonalAdminSchema,
  createPersonalAdminSchema,
  getPersonalAdminSchema,
} = require("./../../schemas/personalAdmin.schema");

//inicializando
const router = express.Router();
const personalService = new PersonalService();

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const personal = await personalService.find(req);

    res.json({
        personal,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getPersonalAdminSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const personal = await personalService.findOne(id);

      res.json({
        personal,
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
  validatorHandlerObjetos(createPersonalAdminSchema, "personalAdmin"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await personalService.create(body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getPersonalAdminSchema, "params"),
  validatorHandlerObjetos(updateUsuarioSchema, "usuario"),
  validatorHandlerObjetos(updatePersonaSchema, "persona"),
  validatorHandlerObjetos(updatePersonalAdminSchema, "personalAdmin"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const personalAdmin = await personalService.update(id, body);

      res.status(201).json(personalAdmin);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getPersonalAdminSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await personalService.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
