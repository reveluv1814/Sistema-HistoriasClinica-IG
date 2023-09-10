//envia la conexion a los modelos

const { Usuario, UsuarioSchema } = require("./usuario.model");
const { Persona, PersonaSchema } = require("./persona.model");
const { Doctor, DoctorSchema } = require("./doctor.model");
const { Laboratorista, LaboratoristaSchema } = require("./laboratorista.model");
const { PersonalAdmin, PersonalAdminSchema } = require("./personalAdmin.model");
const { Paciente, PacienteSchema } = require("./paciente.model");
const { Cita, CitaSchema } = require("./cita.model");
const { Historia, HistoriaSchema } = require("./historia.model");
const { P_creaPac, P_creaPacSchema } = require("./p_creaPac.model");
const {
  AntecedenteF,
  AntecedenteFSchema,
} = require("./antecedenteFamiliar.model");
const { AntecedenteP,AntecedentePSchema } = require("./antecedentePersonal.model");

//configuracion de los modelos
function setupModels(sequelize) {
  //inicia modelos
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Doctor.init(DoctorSchema, Doctor.config(sequelize));
  PersonalAdmin.init(PersonalAdminSchema, PersonalAdmin.config(sequelize));
  Laboratorista.init(LaboratoristaSchema, Laboratorista.config(sequelize));
  Paciente.init(PacienteSchema, Paciente.config(sequelize));
  Cita.init(CitaSchema, Cita.config(sequelize));
  Historia.init(HistoriaSchema, Historia.config(sequelize));
  P_creaPac.init(P_creaPacSchema, P_creaPac.config(sequelize));
  AntecedenteF.init(AntecedenteFSchema, AntecedenteF.config(sequelize));
  AntecedenteP.init(AntecedentePSchema, AntecedenteP.config(sequelize));

  //crea la asociacion
  //----uno a uno
  Usuario.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Doctor.associate(sequelize.models);
  PersonalAdmin.associate(sequelize.models);
  Laboratorista.associate(sequelize.models);
  Paciente.associate(sequelize.models);
  Cita.associate(sequelize.models);
  Historia.associate(sequelize.models);
  AntecedenteF.associate(sequelize.models);
  AntecedenteP.associate(sequelize.models);
}

module.exports = setupModels;
