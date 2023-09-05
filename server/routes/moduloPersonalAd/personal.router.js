const express = require("express");

const pacienteRouter = require("./paciente.router");
const citaRouter = require("./cita.router");

const router = express.Router();

router.use("/paciente", pacienteRouter);
router.use("/cita", citaRouter);


module.exports = router;
