const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class OrejasService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea orejas
    const newOrejas = await models.Orejas.create(data);

    // Luego, actualiza la exploracion fisica con el ID de las orejas creadas
    await models.ExploracionF.update(
      { orejasId: newOrejas.id },
      { where: { id: exploracionFId } }
    );

    return newOrejas;
  }
  async updateOrejas(data, id) {
    // Busca orejas por su ID
    const orejas = await models.Orejas.findByPk(id);

    if (!orejas) {
      throw boom.notFound("Orejas not found");
    }
    const newOrejas = await orejas.update(data);

    return newOrejas;
  }
  async deleteOrejas(id) {
   //busca orejas para eliminarlo
    const orejas = await models.Orejas.findByPk(id);
    if (!orejas) {
      throw boom.notFound("Orejas not found");
    }
    await orejas.destroy();
    return { message: "Orejas deleted successfully", id };
  }
}

module.exports = OrejasService;
