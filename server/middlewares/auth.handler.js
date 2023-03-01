const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  //Si todo es correcto hará next(), es decir, dejamos que ingrese a la capa de servicios o ejecutar los siguientes middlewares, de lo contrario arrojará un error unauthorized
  //para ver si tienes permiso de hacer peticiones
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) next();
  else next(boom.unauthorized());
  //no esta usado pero podrias
}

function checkAdminRole(req, res, next) {
  console.log(req.usuario);

  const user = req.user;
  if (user.role === 'admin') next();
  else next(boom.unauthorized());
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.rol)) next();
    else next(boom.unauthorized());
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
