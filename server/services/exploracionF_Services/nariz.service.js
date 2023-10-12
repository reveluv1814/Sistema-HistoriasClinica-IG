const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class NarizService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea la nariz
    const newNariz = await models.Nariz.create(data);

    // Luego, actualiza la exploracion fisica con el ID de los ojos creados
    await models.ExploracionF.update(
      { narizId: newNariz.id },
      { where: { id: exploracionFId } }
    );

    return newNariz;
  }
  async updateNariz(data, id) {
    // Busca la nariz por su ID
    const nariz = await models.Nariz.findByPk(id);

    if (!nariz) {
      throw boom.notFound("Nariz not found");
    }
    const newNariz = await nariz.update(data);

    return newNariz;
  }
  async deleteNariz(id) {
   //busca la nariz para eliminarlo
    const nariz = await models.Nariz.findByPk(id);
    if (!nariz) {
      throw boom.notFound("Nariz not found");
    }
    await nariz.destroy();
    return { message: "Nariz deleted successfully", id };
  }
}

module.exports = NarizService;
