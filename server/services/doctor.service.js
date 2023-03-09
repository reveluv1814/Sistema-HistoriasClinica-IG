const boom = require("@hapi/boom");
//hash
const bcrypt = require("bcrypt");

const { models } = require("../libs/sequelize");

class DoctorService {
  constructor() {}

  async find() {
    const rta = await models.Doctor.findAll({
      include: ["usuario", "persona"],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Doctor.findByPk(id);
    if (!user) {
      throw boom.notFound("doctor no encontrado");
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.usuario.password, 10);
    const newData = {
      ...data,
      usuario: {
        ...data.usuario,
        password: hash,
      },
    };

    const newDoctor = await models.Doctor.create(newData, {
      include: ["usuario", "persona"],
    });
    return newDoctor;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const newData = {
      ...changes,
      usuario: {
        ...changes.usuario,
      },
      persona: {
        ...changes.persona,
      },
    };
    const rta = await model.update(newData, {
      include: ["usuario", "persona"],
    });
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy({
      include: ["usuario", "persona"],
    });
    return { rta: true };
  }
}

module.exports = DoctorService;
