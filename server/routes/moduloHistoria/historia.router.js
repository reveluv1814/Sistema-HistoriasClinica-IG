const express = require("express");

const HistoriaService = require("../../services/historia.service");
const configureMulter = require("./../../libs/uploadImages");
const { config } = require("../../config/config");
//middlewares
const { validatorHandler } = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("../../middlewares/auth.handler"); //para verificar el rol
//schemas
const { getHistoriaSchema } = require("../../schemas/historiaClinica.schema");

//routers de las demás tablas
const antecedenteFRouter = require("./antecedenteF.router");
const antecedentePRouter = require("./antecedenteP.router");
const composicionFRouter = require("./composicionF.router");
const exploracionFRouter = require("./exploracionF.router");
const laboratorioRouter = require("./../moduloLaboratorista/historiaLabo.router");

//inicializando
const router = express.Router();
const historiaService = new HistoriaService();

//configuracon de multer con las rutas y nombre, en este caso ruta doctor y nombre doctor
const upload = configureMulter(config.urlImagenes + "arbolGene", "arbolG");

router.get(
  "/:id",
  checkRoles("admin", "personalAdmin", "doctor", "laboratorista"),
  validatorHandler(getHistoriaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historia = await historiaService.findPacHis(id);
      res.json({
        historia,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/form/:id",
  checkRoles("admin", "doctor", "laboratorista"),
  validatorHandler(getHistoriaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historia = await historiaService.findHis(id);
      res.json({
        historia,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/apartados/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historia = await historiaService.findApartados(id);
      res.json(historia);
    } catch (error) {
      next(error);
    }
  }
);

//imagenes edit
router.post(
  "/:id/actualizar-foto",
  checkRoles("admin", "doctor"),
  upload.single("fileHC"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await historiaService.actualizarArbolG(id, req.file);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

//routers de las demas tablas
router.use("/antecedenteF", antecedenteFRouter);
router.use("/antecedenteP", antecedentePRouter);
router.use("/composicionF", composicionFRouter);
router.use("/exploracionF", exploracionFRouter);
router.use("/laboratorio", laboratorioRouter);

module.exports = router;
