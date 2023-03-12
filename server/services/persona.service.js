
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class PersonaService {
  constructor() {}

  async create(data) {
    const newPersona = await models.Persona.create(data);
    return newPersona;
  }

  async find() {
    const rta = await models.Persona.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Persona.findByPk(id);
    if (!user) throw boom.notFound("Persona not found");
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
  async deleteUsuario(personaId) {
    await models.Persona.destroy({
      where: { id: personaId }
    });
    return { personaId };
  }
}

module.exports = PersonaService;
