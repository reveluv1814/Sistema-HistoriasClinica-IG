const express = require("express");
const ExploracionFService = require("./../../services/exploracionF.service");

//middlewares
const {
  validatorHandlerObjetos,
  validatorHandler,
} = require("../../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../../middlewares/auth.handler"); //para verificar el rol
//schemas
const {createExploracionFSchema,getExploracionFSchema,updateExploracionFSchema} = require("./../../schemas/exploracionF.schema");
const {getHistoriaSchema } = require("./../../schemas/historiaClinica.schema");


//routers de las demás tablas relacionadas
const craneoFRouter = require("./exploracionF_Routers/craneoF.router");
const orejasRouter = require("./exploracionF_Routers/orejas.router");
const ojosRouter = require("./exploracionF_Routers/ojos.router");
const narizRouter = require("./exploracionF_Routers/nariz.router");
const maxMandibulaRouter = require("./exploracionF_Routers/maxMandibula.router");
const bocaRouter = require("./exploracionF_Routers/boca.router");
const cuelloRouter = require("./exploracionF_Routers/cuello.router");
const toraxRouter = require("./exploracionF_Routers/torax.router");
const columnaRouter = require("./exploracionF_Routers/columna.router");
const abdomenRouter = require("./exploracionF_Routers/abdomen.router");
const tejidoSubRouter = require("./exploracionF_Routers/tejidoSub.router");
const musculaturaRouter = require("./exploracionF_Routers/musculatura.router");
const exNeurologicoRouter = require("./exploracionF_Routers/exNeurologico.router");
const pielAnexosRouter = require("./exploracionF_Routers/pielAnexos.router");
const genitalesExRouter = require("./exploracionF_Routers/genitalesEx.router");
const miembrosRouter = require("./exploracionF_Routers/miembros.router");

//inicializando
const router = express.Router();
const exploracionFService = new ExploracionFService();

router.post(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getHistoriaSchema, "params"),
  validatorHandlerObjetos(createExploracionFSchema, "exploracionF"),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const {exploracionF} = req.body;
        const exploracionF_create = await exploracionFService.create(exploracionF,id );
  
        res.status(201).json(exploracionF_create);
      } catch (error) {
        next(error);
      }
  }
);
router.patch(
  "/:id",
  checkRoles("admin", "doctor"),
  validatorHandler(getExploracionFSchema, "params"),
  validatorHandlerObjetos(updateExploracionFSchema, "exploracionF"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {exploracionF} = req.body;

      const exploracionF_update = await exploracionFService.updateExploracionF(exploracionF, id);

      res.status(202).json(exploracionF_update);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
    "/:id",
    checkRoles("admin", "doctor"),
    validatorHandler(getExploracionFSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await exploracionFService.deleteExploracionF(id));
      } catch (error) {
        next(error);
      }
    }
);

//routers de las demas tablas
router.use("/craneoF", craneoFRouter);
router.use("/orejas", orejasRouter);
router.use("/ojos", ojosRouter);
router.use("/nariz", narizRouter);
router.use("/maxMandibula", maxMandibulaRouter);
router.use("/boca", bocaRouter);
router.use("/cuello", cuelloRouter);
router.use("/torax", toraxRouter);
router.use("/columna", columnaRouter);
router.use("/abdomen", abdomenRouter);
router.use("/tejidoSub", tejidoSubRouter);
router.use("/musculatura", musculaturaRouter);
router.use("/exNeurologico", exNeurologicoRouter);
router.use("/pielAnexos", pielAnexosRouter);
router.use("/genitalesEx", genitalesExRouter);
router.use("/miembros", miembrosRouter);

module.exports = router;
