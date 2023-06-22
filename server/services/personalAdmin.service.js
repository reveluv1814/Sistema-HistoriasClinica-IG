const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class PersonalAdminService {
  constructor() {}

  async find() {
    const rta = await models.PersonalAdmin.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.PersonalAdmin.findByPk(id);
    if (!user) {
      throw boom.notFound("Personal Administrativo no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.PersonalAdmin.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.PersonalAdmin.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const newPersonalAdmin = await models.PersonalAdmin.create(data);
    return newPersonalAdmin;
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
    await models.PersonalAdmin.destroy({
      where: { usuarioId: id },
    });
    return { rta: true };
  }
  //crea un paciente
  async addPaciente(data) {
    const newPaciente = await models.P_creaPac.create(data);
    return newPaciente;
  }
}

module.exports = PersonalAdminService;
