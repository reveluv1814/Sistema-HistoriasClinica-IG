const express = require("express");

const UsuarioService = require("./../services/usuario.service");
const PersonaService = require("./../services/persona.service");
const DoctorService = require("./../services/doctor.service");
const PersonalAdminService = require("./../services/personalAdmin.service");
const LaboratoristaService = require("./../services/laboratorista.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  updateUsuarioSchema,
  createUsuarioSchema,
  getUsuarioSchema,
} = require("./../schemas/usuario.schema");
const {
  updatePersonaSchema,
  createPersonaSchema,
} = require("./../schemas/persona.schema");
const {
  updateDoctorSchema,
  createDoctorSchema,
} = require("./../schemas/doctor.schema");
const {
  updatePersonalAdminSchema,
  createPersonalAdminSchema,
} = require("../schemas/personalAdmin.schema");
const {
  updateLaboratoristaSchema,
  createLaboratoristaSchema,
} = require("../schemas/laboratorista.schema");

const router = express.Router();

//
const usuarioService = new UsuarioService();
const personaService = new PersonaService();
const doctorService = new DoctorService();
const personalAdminService = new PersonalAdminService();
const laboratoristaService = new LaboratoristaService();

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const usuarios = await usuarioService.find();

    res.json({
      usuarios,
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
      const usuario = await usuarioService.findOne(id);

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

  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await usuarioService.create(body.usuario);
      const newPersona = await personaService.create(body.persona);
      let newUsuarioRol, validaSchema;

      if (body.usuario.rol === "doctor") {
        validaSchema = validatorHandlerObjetos(createDoctorSchema, "doctor");
        if (validaSchema.error) throw new Error(validaSchema.error);

        newUsuarioRol = await doctorService.create({
          ...body.doctor,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        });
      } else if (body.usuario.rol === "personalAdmin") {
        validaSchema = validatorHandlerObjetos(
          createPersonalAdminSchema,
          "personalAdmin"
        );
        if (validaSchema.error) throw new Error(validaSchema.error);

        newUsuarioRol = await personalAdminService.create({
          ...body.personalAdmin,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        });
      } else if (body.usuario.rol === "laboratorista") {
        validaSchema = validatorHandlerObjetos(
          createLaboratoristaSchema,
          "laboratorista"
        );
        if (validaSchema.error) throw new Error(validaSchema.error);

        newUsuarioRol = await laboratoristaService.create({
          ...body.laboratorista,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        });
      }

      res.status(201).json({ newUsuario, newPersona, newUsuarioRol });
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
  async (req, res, next) => {
    try {
      const { id } = req.params;

      ///
      const body = req.body;
      const usuarioRol = await usuarioService.findOne(id); //busca
      let usuarioActualizado, validaSchema;

      if (usuarioRol.rol === "doctor") {
        validaSchema = validatorHandlerObjetos(updateDoctorSchema, "doctor");
        if (validaSchema.error) throw new Error(validaSchema.error);
        //
        const doctorBusca = await doctorService.findByUsuario(id);
        const personaBusca = await personaService.findOne(
          doctorBusca.personaId
        );
        //
        const doctor = await doctorService.update(doctorBusca.id, body.doctor);
        const persona = await personaService.update(
          personaBusca.id,
          body.persona
        );
        usuarioActualizado = { doctor, persona };
      } else if (usuarioRol.rol === "personalAdmin") {
        validaSchema = validatorHandlerObjetos(
          updatePersonalAdminSchema,
          "personalAdmin"
        );
        if (validaSchema.error) throw new Error(validaSchema.error);
        //
        const personalAdminBusca = await personalAdminService.findByUsuario(id);
        const personaBusca = await personaService.findOne(
          personalAdminBusca.personaId
        );
        //
        const personalAdmin = await personalAdminService.update(
          personalAdminBusca.id,
          body.personalAdmin
        );
        const persona = await personaService.update(
          personaBusca.id,
          body.persona
        );
        usuarioActualizado = { personalAdmin, persona };
      }
      if (usuarioRol.rol === "laboratorista") {
        validaSchema = validatorHandlerObjetos(
          updateLaboratoristaSchema,
          "laboratorista"
        );
        if (validaSchema.error) throw new Error(validaSchema.error);
        //
        const laboratoristaBusca = await laboratoristaService.findByUsuario(id);
        const personaBusca = await personaService.findOne(
          laboratoristaBusca.personaId
        );
        //
        const laboratorista = await laboratoristaService.update(
          laboratoristaBusca.id,
          body.laboratorista
        );
        const persona = await personaService.update(
          personaBusca.id,
          body.persona
        );
        usuarioActualizado = { laboratorista, persona };
      }

      const usuario = await usuarioService.update(id, body.usuario);

      res.json({ usuario, ...usuarioActualizado });
    } catch (error) {
      next(error);
    }
  }
);

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
