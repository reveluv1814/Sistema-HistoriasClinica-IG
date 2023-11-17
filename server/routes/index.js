const express = require("express");
const passport = require("passport");

//const usuarioRouter = require("./usuario.router");
const authRouter = require("./authRoute/auth.router");
const prueba = require("./prueba.router");
const adminRouter = require("./moduloAdmin/admin.router");
const personalRouter = require("./moduloPersonalAd/personal.router");
const doctorRouter = require("./moduloDoctor/doctor.router");
const historiaRouter = require("./moduloHistoria/historia.router");

//middleware que verifica token para dar acceso
const estaAutorizado = passport.authenticate("jwt", { session: false });

function routerApi(app) {
  const router = express.Router();

  app.use("/api", router);
  router.use("/backdoor", prueba);

  //ruta de login etc
  app.use("/auth", authRouter);
  //admin /middleware/ router que usa (en este caso usuario)
  app.use("/admin", estaAutorizado, adminRouter);
  app.use("/personal", estaAutorizado, personalRouter);
  app.use("/doctor", estaAutorizado, doctorRouter);
  app.use("/historia", estaAutorizado, historiaRouter);
  //crea usuario-doctor-persona
  //app.use("/doctor", estaAutorizado, doctorRouter);
}

module.exports = routerApi;
