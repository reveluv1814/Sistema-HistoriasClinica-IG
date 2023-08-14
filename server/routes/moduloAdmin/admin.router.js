const express = require("express");

const UsuarioService = require("./../../services/usuario.service");
const PersonaService = require("./../../services/persona.service");
const DoctorService = require("./../../services/doctor.service");
const PersonalAdminService = require("./../../services/personalAdmin.service");
const LaboratoristaService = require("./../../services/laboratorista.service");
//
const doctorRouter = require("./doctor.router");
const personalRouter = require("./personal.router");
const laboratoristaRouter = require("./laboratorista.router");

//middlewares
const { validatorHandler } = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const { getUsuarioSchema } = require("./../../schemas/usuario.schema");

const router = express.Router();

//
const usuarioService = new UsuarioService();
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

module.exports = router;
