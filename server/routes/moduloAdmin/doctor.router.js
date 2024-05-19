const express = require("express");
const DoctorService = require("./../../services/doctor.service");
const configureMulter = require("./../../libs/uploadImages");
const { config } = require("../../config/config");

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
  updateDoctorSchema,
  createDoctorSchema,
  getDoctorSchema,
} = require("./../../schemas/doctor.schema");

//inicializando
const router = express.Router();
const doctorService = new DoctorService();

//configuracon de multer con las rutas y nombre, en este caso ruta doctor y nombre doctor
const upload = configureMulter(config.urlImagenes + "doctores", "doctor");

///peticiones

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const doctores = await doctorService.find(req);

    res.json({
      doctores,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getDoctorSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const doctor = await doctorService.findOne(id);

      res.json({
        doctor,
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
      const user = await doctorService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

///imagenes post
router.post(
  "/:id/foto",
  checkRoles("admin"),
  upload.single("fileHC"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await doctorService.fotoDoctor(id, req.file);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);
//imagenes edit
router.post(
  "/:id/actualizar-foto",
  checkRoles("admin"),
  upload.single("fileHC"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await doctorService.actualizarFotoDoctor(id, req.file);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getDoctorSchema, "params"),
  validatorHandlerObjetos(updateUsuarioSchema, "usuario"),
  validatorHandlerObjetos(updatePersonaSchema, "persona"),
  validatorHandlerObjetos(updateDoctorSchema, "doctor"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const doctor = await doctorService.update(id, body);

      res.status(201).json(doctor);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getDoctorSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await doctorService.deleteUsuario(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
