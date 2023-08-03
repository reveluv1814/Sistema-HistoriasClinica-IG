const express = require("express");

const pacienteRouter = require("./paciente.router");

const router = express.Router();

router.use("/paciente", pacienteRouter);


module.exports = router;
