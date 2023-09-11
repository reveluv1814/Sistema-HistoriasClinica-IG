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
const {
  AntecedenteP,
  AntecedentePSchema,
} = require("./antecedentePersonal.model");
const {
  ComposicionF,
  ComposicionFSchema,
} = require("./composicionFamiliar.model");
const {
  ExploracionF,
  ExploracionFSchema,
} = require("./exploracionFisica.model");
//exploracion fisica
const {
  CraneoF,
  CraneoFSchema,
} = require("./exploracionFisicaModels/craneoFacial.model");
const { Orejas, OrejasSchema,} = require("./exploracionFisicaModels/orejas.model");
const { Ojos, OjosSchema,} = require("./exploracionFisicaModels/ojos.model");
const { Nariz, NarizSchema,} = require("./exploracionFisicaModels/nariz.model");
const { MaxMandibula, MaxMandibulaSchema,} = require("./exploracionFisicaModels/maxMandibula.model");
const { Boca, BocaSchema,} = require("./exploracionFisicaModels/boca.model");
const { Cuello, CuelloSchema,} = require("./exploracionFisicaModels/cuello.model");
const { Torax, ToraxSchema,} = require("./exploracionFisicaModels/torax.model");

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
  ComposicionF.init(ComposicionFSchema, ComposicionF.config(sequelize));
  ExploracionF.init(ExploracionFSchema, ExploracionF.config(sequelize));
  //exploracion fisica
  CraneoF.init(CraneoFSchema, CraneoF.config(sequelize));
  Orejas.init(OrejasSchema, Orejas.config(sequelize));
  Ojos.init(OjosSchema, Ojos.config(sequelize));
  Nariz.init(NarizSchema, Nariz.config(sequelize));
  MaxMandibula.init(MaxMandibulaSchema, MaxMandibula.config(sequelize));
  Boca.init(BocaSchema, Boca.config(sequelize));
  Cuello.init(CuelloSchema, Cuello.config(sequelize));
  Torax.init(ToraxSchema, Torax.config(sequelize));

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
  ComposicionF.associate(sequelize.models);
  ExploracionF.associate(sequelize.models);
  //relaciones exploracion fisica
  CraneoF.associate(sequelize.models);
  Orejas.associate(sequelize.models);
  Ojos.associate(sequelize.models);
  Nariz.associate(sequelize.models);
  MaxMandibula.associate(sequelize.models);
  Boca.associate(sequelize.models);
  Cuello.associate(sequelize.models);
  Torax.associate(sequelize.models);
}

module.exports = setupModels;
