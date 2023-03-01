const express = require("express");

const usuarioRouter = require("./../usuario.router");

const router = express.Router();

router.use("/usuario", usuarioRouter);

module.exports = router;
