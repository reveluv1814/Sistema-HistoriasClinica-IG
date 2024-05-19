const express = require("express");

const UsuarioService = require("./../../services/usuario.service");
const AdminService = require("./../../services/admin.service");
const PersonaService = require("./../../services/persona.service");
const DoctorService = require("./../../services/doctor.service");
const PersonalAdminService = require("./../../services/personalAdmin.service");
const LaboratoristaService = require("./../../services/laboratorista.service");
//
const doctorRouter = require("./doctor.router");
const personalRouter = require("./personal.router");
const laboratoristaRouter = require("./laboratorista.router");

//middlewares
const {
  validatorHandler,
  validatorHandlerObjetos,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  getUsuarioSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
} = require("./../../schemas/usuario.schema");
const {
  createPersonaSchema,
  updatePersonaSchema,
} = require("../../schemas/persona.schema");
const {
  createDoctorSchema,
  updateDoctorSchema,
} = require("../../schemas/doctor.schema");
const {
  createLaboratoristaSchema,
  updateLaboratoristaSchema,
} = require("../../schemas/laboratorista.schema");
const {
  createPersonalAdminSchema,
  updatePersonalAdminSchema,
} = require("../../schemas/personalAdmin.schema");

const router = express.Router();

//
const usuarioService = new UsuarioService();
const adminService = new AdminService();
const personaService = new PersonaService();
const doctorService = new DoctorService();
const personalAdminService = new PersonalAdminService();
const laboratoristaService = new LaboratoristaService();

router.get("/profile/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.findOne(id);

    res.json({
      usuario,
    });
  } catch (error) {
    next(error);
  }
});

/*get por roles*/
router.use("/doctor", doctorRouter);
router.use("/personalAd", personalRouter);
router.use("/laboratorista", laboratoristaRouter);

router.delete(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.findOne(id);
      let usuarioRol, persona;

      if (usuario.rol === "doctor") {
        await doctorService.deleteUsuario(usuario.id);
        await personaService.deleteUsuario(usuario.doctor.personaId);
        usuarioRol = usuario.doctor.id;
        persona = usuario.doctor.personaId;
      } else if (usuario.rol === "personalAdmin") {
        await personalAdminService.deleteUsuario(usuario.id);
        await personaService.deleteUsuario(usuario.personalAdmin.personaId);
        usuarioRol = usuario.personalAdmin.id;
        persona = usuario.personalAdmin.personaId;
      } else if (usuario.rol === "laboratorista") {
        await laboratoristaService.deleteUsuario(usuario.id);
        await personaService.deleteUsuario(usuario.laboratorista.personaId);
        usuarioRol = usuario.laboratorista.id;
        persona = usuario.laboratorista.personaId;
      }

      await usuarioService.delete(usuario.id);

      res.status(201).json({
        id,
        persona,
        usuarioRol,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const admins = await adminService.find(req);

    res.json({
      admins,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await adminService.findOne(id);

      res.json({
        usuario,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/rol/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await adminService.findRol(id);

      res.json({
        usuario,
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
  validatorHandlerObjetos(createDoctorSchema, "doctor"),
  validatorHandlerObjetos(createLaboratoristaSchema, "laboratorista"),
  validatorHandlerObjetos(createPersonalAdminSchema, "personalAdmin"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await adminService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  validatorHandlerObjetos(updateUsuarioSchema, "usuario"),
  validatorHandlerObjetos(updatePersonaSchema, "persona"),
  validatorHandlerObjetos(updateDoctorSchema, "doctor"),
  validatorHandlerObjetos(updatePersonalAdminSchema, "personalAdmin"),
  validatorHandlerObjetos(updateLaboratoristaSchema, "laboratorista"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await adminService.update(id, body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
