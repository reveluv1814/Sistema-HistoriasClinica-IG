//envia la conexion a los modelos

const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Doctor, DoctorSchema } = require('./doctor.model');

//configuracion de los modelos
function setupModels(sequelize) {
  //inicia modelos
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Doctor.init(DoctorSchema, Doctor.config(sequelize));

  //crea la asociacion 
  //----uno a uno
  Usuario.associate(sequelize.models);
  Doctor.associate(sequelize.models);


  
}

module.exports = setupModels;
