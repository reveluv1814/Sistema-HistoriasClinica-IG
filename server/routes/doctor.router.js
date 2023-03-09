const express = require("express");

const DoctorService = require("./../services/doctor.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updateDoctorSchema,
  createDoctorSchema,
  getDoctorSchema,
} = require("./../schemas/doctor.schema");
const { checkRoles } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new DoctorService();

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const doctores = await service.find();
    res.json(doctores);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getDoctorSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkRoles("admin"),
  validatorHandler(createDoctorSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getDoctorSchema, "params"),
  validatorHandler(updateDoctorSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const doctor = await service.update(id, body);
      res.json(doctor);
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
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
