const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models } = require("./../libs/sequelize");
const PacienteService = require("./paciente.service");

class HistoriaService {
  constructor() {}

  async create(data) {
    const newHistoria = await models.HistoriaClinica.create(data);
    return newHistoria;
  }

  async find() {
    const rta = await models.HistoriaClinica.findAll();
    return rta;
  }

  async findOne(id) {
    const historia = await models.HistoriaClinica.findByPk(id);
    if (!historia) throw boom.notFound("Historia not found");
    return historia;
  }
  async findPacHis(id) {
    const pacienteService = new PacienteService();

    const rta = await models.P_creaPac.findOne({
      where: { pacienteId: id },
      //attributes: ["historiaId"],
    });
    if (!rta) throw boom.notFound("Historia not found");

    //busca los datos del paciente
    const paciente = await pacienteService.findPacienteHistoria(id);
    if (!paciente) throw boom.notFound("Historia not found");

    const historiaP = await models.HistoriaClinica.findOne({
      where: { id: rta.historiaId },
      include: [
        {
          model: models.AntecedentesF,
          as: "antecedenteF",
          //attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
        {
          model: models.AntecedentesP,
          as: "antecedenteP",
          //attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
        {
          model: models.ComposicionF,
          as: "composicionesF",
          //attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
        {
          model: models.ExploracionF,
          as: "exploracionF",
          //attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
         {
          model: models.Laboratorista,
          through: models.HistoriaLabo,
          as: "laboratoristas",
          //attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
      ],
    });

    if (!historiaP) throw boom.notFound("Historia not found");
    const citas = await models.Cita.findAll({
      where: { historiaId: historiaP.id, estado: false },
      include: [
        {
          model: models.Doctor,
          as: "doctor",
          attributes: ["unidad"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("doctor.persona.nombre"),
                    " ",
                    Sequelize.col("doctor.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("doctor.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
      ],
    });

    return { paciente, ...historiaP.toJSON(), citas };
  }

  async update(id, changes) {
    const historia = await this.findOne(id);
    const rta = await historia.update(changes);
    return rta;
  }

  async delete(id) {
    const historia = await this.findOne(id);
    await historia.destroy();
    return { id };
  }
  /* async deleteCita(citaId) {
    await models.Cita.destroy({
      where: { id: citaId }
    });
    return { citaId };
  } */
}
/*
para crear un antecedente familiar:
const { Historia, AntecedenteF } = require('./models'); // Importa tus modelos de Sequelize

// Supongamos que tienes la ID de la historia clínica existente y los datos del antecedente familiar
const historiaId = 1; // Reemplaza esto con la ID real de la historia clínica
const antecedenteFamiliarData = {
  nomPadre: 'Nombre del Padre',
  fechaNac_Padre: new Date('1980-01-01'),
  profesionPadre: 'Profesión del Padre',
  // ... otros campos del antecedente familiar
};

// Primero, obtén la instancia de la historia clínica existente
const historiaClinica = await Historia.findByPk(historiaId);

if (!historiaClinica) {
  // Maneja el caso donde no se encuentra la historia clínica
  console.error('La historia clínica no fue encontrada.');
} else {
  try {
    // Crea el antecedente familiar y establece la relación
    const antecedenteFamiliar = await AntecedenteF.create(antecedenteFamiliarData);
    
    // Asocia el antecedente familiar con la historia clínica
    historiaClinica.setAntecedenteF(antecedenteFamiliar);

    // Guarda los cambios en la base de datos
    await historiaClinica.save();

    console.log('Antecedente familiar creado y asociado con éxito.');
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la creación o asociación
    console.error('Error al crear y asociar el antecedente familiar:', error.message);
  }
}
*/

module.exports = HistoriaService;
