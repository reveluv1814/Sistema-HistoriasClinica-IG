//envia la conexion a los modelos

const { Usuario, UsuarioSchema } = require("./usuario.model");
const { Persona, PersonaSchema } = require("./persona.model");
const { Doctor, DoctorSchema } = require("./doctor.model");
const { Laboratorista, LaboratoristaSchema } = require("./laboratorista.model");
const { PersonalAdmin, PersonalAdminSchema } = require("./personalAdmin.model");

//configuracion de los modelos
function setupModels(sequelize) {
  //inicia modelos
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Doctor.init(DoctorSchema, Doctor.config(sequelize));
  PersonalAdmin.init(PersonalAdminSchema, PersonalAdmin.config(sequelize));
  Laboratorista.init(LaboratoristaSchema, Laboratorista.config(sequelize));

  //crea la asociacion
  //----uno a uno
  Usuario.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Doctor.associate(sequelize.models);
  PersonalAdmin.associate(sequelize.models);
  Laboratorista.associate(sequelize.models);


}

module.exports = setupModels;
