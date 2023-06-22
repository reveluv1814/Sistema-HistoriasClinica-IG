
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");
const { Persona } = require("../db/models/persona.model");

class PacienteService {
  constructor() {}

  async create(data) {
    const newPaciente = await models.Paciente.create(data);
    return newPaciente;
  }

  async find() {
    const rta = await models.Paciente.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
        },
      ],
    });
    return rta;
  }

  async findOne(id) {
    const paciente = await models.Paciente.findByPk(id);
    if (!paciente) throw boom.notFound("Paciente not found");
    return paciente;
  }

  async update(id, changes) {
    const paciente = await this.findOne(id);
    const rta = await paciente.update(changes);
    return rta;
  }

  async delete(id) {
    const paciente = await this.findOne(id);
    await paciente.destroy();
    return { id };
  }
  async deletePaciente(pacienteId) {
    await models.Paciente.destroy({
      where: { id: pacienteId }
    });
    return { pacienteId };
  }
}

module.exports = PacienteService;
