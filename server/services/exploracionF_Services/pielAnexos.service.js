const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class PielAnexosService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el pielAnexos
    const newPielAnexos= await models.PielAnexos.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el pielAnexos creado
    await models.ExploracionF.update(
      { pielAnexosId: newPielAnexos.id },
      { where: { id: exploracionFId } }
    );

    return newPielAnexos;
  }
  async updatePielAnexos(data, id) {
    // Busca el PielAnexos por su ID
    const pielAnexos = await models.PielAnexos.findByPk(id);

    if (!pielAnexos) {
      throw boom.notFound("PielAnexos not found");
    }
    const newPielAnexos = await pielAnexos.update(data);

    return newPielAnexos;
  }
  async deletePielAnexos(id) {
   //busca el PielAnexos para eliminarlo
    const pielAnexos = await models.PielAnexos.findByPk(id);
    if (!pielAnexos) {
      throw boom.notFound("PielAnexos not found");
    }
    await pielAnexos.destroy();
    return { message: "PielAnexos deleted successfully", id };
  }
}

module.exports = PielAnexosService ;