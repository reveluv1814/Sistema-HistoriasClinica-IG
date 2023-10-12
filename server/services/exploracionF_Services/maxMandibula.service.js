const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class MaxMandibulaService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea la maxMandibula
    const newMaxMandibula = await models.MaxMandibula.create(data);

    // Luego, actualiza la exploracion fisica con el ID de la maxMandibula creada
    await models.ExploracionF.update(
      { maxMandibulaId: newMaxMandibula.id },
      { where: { id: exploracionFId } }
    );

    return newMaxMandibula;
  }
  async updateMaxMandibula(data, id) {
    // Busca la MaxMandibula por su ID
    const maxMandibula = await models.MaxMandibula.findByPk(id);

    if (!maxMandibula) {
      throw boom.notFound("MaxMandibula not found");
    }
    const newMaxMandibula = await maxMandibula.update(data);

    return newMaxMandibula;
  }
  async deleteMaxMandibula(id) {
   //busca la MaxMandibula para eliminarlo
    const maxMandibula = await models.MaxMandibula.findByPk(id);
    if (!maxMandibula) {
      throw boom.notFound("MaxMandibula not found");
    }
    await maxMandibula.destroy();
    return { message: "MaxMandibula deleted successfully", id };
  }
}

module.exports = MaxMandibulaService;