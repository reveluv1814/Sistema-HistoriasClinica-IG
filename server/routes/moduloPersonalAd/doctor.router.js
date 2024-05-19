const express = require("express");
const DoctorService = require("./../../services/doctor.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const { getDoctorSchema } = require("./../../schemas/doctor.schema");

//inicializando
const router = express.Router();
const doctorService = new DoctorService();

router.get(
  "/",
  checkRoles("admin", "personalAdmin"),
  async (req, res, next) => {
    try {
      const doctores = await doctorService.findCita();

      res.json({
        doctores,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  checkRoles("admin", "personalAdmin"),
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

module.exports = router;
