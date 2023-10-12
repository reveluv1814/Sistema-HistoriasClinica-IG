const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class ToraxService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el torax
    const newTorax= await models.Torax.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el torax creado
    await models.ExploracionF.update(
      { toraxId: newTorax.id },
      { where: { id: exploracionFId } }
    );

    return newTorax;
  }
  async updateTorax(data, id) {
    // Busca el torax por su ID
    const torax = await models.Torax.findByPk(id);

    if (!torax) {
      throw boom.notFound("Torax not found");
    }
    const newTorax = await torax.update(data);

    return newTorax;
  }
  async deleteTorax(id) {
   //busca el torax para eliminarlo
    const torax = await models.Torax.findByPk(id);
    if (!torax) {
      throw boom.notFound("Torax not found");
    }
    await torax.destroy();
    return { message: "Torax deleted successfully", id };
  }
}

module.exports = ToraxService;