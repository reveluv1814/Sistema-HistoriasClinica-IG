const express = require("express");
const AntecedenteFService = require("./../../services/antecedentesF.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {
  createAntecedenteFSchema,
  updateAntecedenteFSchema,
  getAntecedenteFSchema,
} = require("./../../schemas/antecedenteF.schema");
const {getHistoriaSchema } = require("./../../schemas/historiaClinica.schema");

//inicializando
const router = express.Router();
const antecedenteFService = new AntecedenteFService();

router.get(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getAntecedenteFSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const antecedenteF = await antecedenteFService.findOne(id);
      res.json(antecedenteF);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getAntecedenteFSchema, "params"),
  validatorHandlerObjetos(createAntecedenteFSchema, "antecedenteF"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {antecedenteF} = req.body;
      const antecedenteFcreate = await antecedenteFService.create(antecedenteF,id );

      res.status(201).json(antecedenteFcreate);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getAntecedenteFSchema, "params"),
  validatorHandlerObjetos(updateAntecedenteFSchema, "antecedenteF"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {antecedenteF} = req.body;

      const antecedenteF_update = await antecedenteFService.updateAntecedenteF(antecedenteF, id);

      res.status(202).json(antecedenteF_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getAntecedenteFSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await antecedenteFService.deleteAntecedenteF(id));
      } catch (error) {
        next(error);
      }
    }
  );

/* router.get(
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
); */

module.exports = router;
