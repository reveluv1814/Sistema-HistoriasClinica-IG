const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("./../libs/sequelize");

class PacienteService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Paciente.findAndCountAll({
      include: [
        {
          model: models.Persona,
          as: "persona",
          where: {
            ci: {
              [Op.iLike]: `%${q}%`,
            },
          },
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                "id",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "ci",
              ],
            },
          ],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    return rta;
  }

  async findOne(id) {
    const paciente = await models.Paciente.findByPk(id, {
      include: [
        {
          model: models.Persona,
          as: "persona",
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                "id",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "ci",
              ],
            },
          ],
        },
      ],
    });
    if (!paciente) throw boom.notFound("Paciente not found");
    return paciente;
  }
  async create(data) {
    const newPaciente = await models.Paciente.create(data);
    return newPaciente;
  }
  async create(data) {
    const { paciente, persona, personalAdmin } = data;

    const newPersona = await models.Persona.create(persona);

    const newPaciente = await models.Paciente.create({
      ...paciente,
      personaId: newPersona.id,
    });
    const newHistoria = await models.HistoriaClinica.create({ arbolGene: "" });
    const newP_Crea = await models.P_creaPac.create({
      ...personalAdmin,
      pacienteId: newPaciente.id,
      historiaId: newHistoria.id,
    });
    return newP_Crea;
  }
  async update(id, changes) {
    const { paciente, persona } = changes;
    const pacienteBuscado = await models.Paciente.findOne({ where: { id } });

    // Actualiza el registro de Usuario
    await models.Persona.update(persona, {
      where: { id: pacienteBuscado.personaId }, // Utiliza el ID del Usuario asociado al Doctor
    });

    // Actualiza el registro de Doctor
    const updatedPaciente = await models.Paciente.update(paciente, {
      where: { id },
    });

    const [rowCount] = updatedPaciente; // Obtiene la cantidad de filas actualizadas
    if (rowCount === 0) {
      // Manejo de error: No se encontró el registro para actualizar
      throw new Error("No se encontró el registro para actualizar");
    }
    return updatedPaciente;
  }
  async delete(id) {
    const paciente = await models.Paciente.findByPk(id);
    if (!paciente) {
      throw new Error("No se encontró el registro del Paciente");
    }
    await models.P_creaPac.destroy({ where: { pacienteId: id } });
    await models.Paciente.destroy({
      where: { id },
    });
    await models.Persona.destroy({ where: { id: paciente.personaId } });
    return { id };
  }
  async deletePaciente(pacienteId) {
    await models.Paciente.destroy({
      where: { id: pacienteId },
    });
    return { pacienteId };
  }
}

module.exports = PacienteService;
