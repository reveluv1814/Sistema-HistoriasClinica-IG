const express = require("express");

const pacienteRouter = require("./paciente.router");
const citaRouter = require("./cita.router");
const doctorRouter = require("./doctor.router");

const router = express.Router();

router.use("/paciente", pacienteRouter);
router.use("/cita", citaRouter);
router.use("/doctor", doctorRouter);

module.exports = router;
