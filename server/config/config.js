require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT_SERVER || 3000,
  dbUrl: process.env.DATABASE_URL,
  //auth
  apiKey: process.env.API_KEY,
  //JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretMail: process.env.JWT_SECRET_MAIL,
  //recovery password
  emailSender: process.env.SMTP_EMAIL,
  emailPassword: process.env.SMTP_PASSWORD,
};

module.exports = { config };
