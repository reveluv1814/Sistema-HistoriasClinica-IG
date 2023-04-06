
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class CitaService {
  constructor() {}

  async create(data) {
    const newCita = await models.Cita.create(data);
    return newCita;
  }

  async find() {
    const rta = await models.Cita.findAll();
    return rta;
  }

  async findOne(id) {
    const cita = await models.Cita.findByPk(id);
    if (!cita) throw boom.notFound("Cita not found");
    return cita;
  }

  async update(id, changes) {
    const cita = await this.findOne(id);
    const rta = await cita.update(changes);
    return rta;
  }

  async delete(id) {
    const cita = await this.findOne(id);
    await cita.destroy();
    return { id };
  }
  async deleteCita(citaId) {
    await models.Cita.destroy({
      where: { id: citaId }
    });
    return { citaId };
  }
}

module.exports = CitaService;
