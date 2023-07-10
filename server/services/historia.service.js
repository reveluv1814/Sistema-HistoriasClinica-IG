
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

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

module.exports = HistoriaService;
