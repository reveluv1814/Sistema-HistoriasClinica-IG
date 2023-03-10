const boom = require("@hapi/boom");
//hash
const bcrypt = require("bcrypt");

const { models } = require("../libs/sequelize");

class DoctorService {
  constructor() {}

  async find() {
    const rta = await models.Doctor.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Doctor.findByPk(id);
    if (!user) {
      throw boom.notFound("doctor no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.Doctor.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.Doctor.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const newDoctor = await models.Doctor.create(data);
    return newDoctor;
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
}

module.exports = DoctorService;
