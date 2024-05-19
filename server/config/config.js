require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT_SERVER || 4000,
  dbUrl: process.env.DATABASE_URL,
  //auth
  apiKey: process.env.API_KEY,
  //JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretMail: process.env.JWT_SECRET_MAIL,
  //recovery password
  emailSender: process.env.SMTP_EMAIL,
  emailPassword: process.env.SMTP_PASSWORD,
  //carpeta imagenes
  urlImagenes: process.env.IMAGE_ROUTE,
  urlImagenesBD: process.env.IMAGE_ROUTE_BD,
  urlImagenesEliminarRuta: process.env.IMAGE_ROUTE_ELIMINAR,
  //url front
  urlFrontService: process.env.URL_FRONT_SERVICE,
};

module.exports = { config };
