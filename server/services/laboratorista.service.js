const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class LaboratoristaService {
  constructor() {}

  async find() {
    const rta = await models.Laboratorista.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Laboratorista.findByPk(id);
    if (!user) {
      throw boom.notFound("Laboratorista no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.Laboratorista.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.Laboratorista.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const newLaboratorista = await models.Laboratorista.create(data);
    return newLaboratorista;
  }

  async update(id, changes) {
    const model = await this.findOne(id);

    const rta = await model.update(changes);
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
  async deleteUsuario(id) {
    await models.Laboratorista.destroy({
      where: { usuarioId: id }
    });
    return { rta: true };
  }
}

module.exports = LaboratoristaService;
