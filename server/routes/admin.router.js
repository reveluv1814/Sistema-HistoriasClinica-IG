const express = require("express");

const UsuarioService = require("./../services/usuario.service");
const PersonaService = require("./../services/persona.service");
const DoctorService = require("./../services/doctor.service");

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

const router = express.Router();

//
const usuarioService = new UsuarioService();
const personaService = new PersonaService();
const doctorService = new DoctorService();

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
  validatorHandlerObjetos(createDoctorSchema, "doctor"),

  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await usuarioService.create(body.usuario);
      const newPersona = await personaService.create(body.persona);
      const newDoctor = await doctorService.create({
        ...body.doctor,
        usuarioId: newUsuario.id,
        personaId: newPersona.id,
      });

      res.status(201).json({ newUsuario, newPersona, newDoctor });
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
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const doctorBusca = await doctorService.findByUsuario(id);
      const personaBusca = await personaService.findOne(doctorBusca.personaId);
      ///
      const body = req.body;
      const usuario = await usuarioService.update(id, body.usuario);
      const doctor = await doctorService.update(doctorBusca.id, body.doctor);
      const persona = await personaService.update(
        personaBusca.id,
        body.persona
      );

      res.json({ usuario, doctor, persona });
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

      await doctorService.deleteUsuario(usuario.id);
      await personaService.deleteUsuario(usuario.doctor.personaId);
      await usuarioService.delete(usuario.id);

      res
        .status(201)
        .json({ id, persona: usuario.doctor.personaId , doctor: usuario.doctor.id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
