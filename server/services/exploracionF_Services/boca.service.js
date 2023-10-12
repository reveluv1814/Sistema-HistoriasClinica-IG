const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class BocaService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea la boca
    const newBoca = await models.Boca.create(data);

    // Luego, actualiza la exploracion fisica con el ID de la boca creada
    await models.ExploracionF.update(
      { bocaId: newBoca.id },
      { where: { id: exploracionFId } }
    );

    return newBoca;
  }
  async updateBoca(data, id) {
    // Busca la boca por su ID
    const boca = await models.Boca.findByPk(id);

    if (!boca) {
      throw boom.notFound("Boca not found");
    }
    const newBoca = await boca.update(data);

    return newBoca;
  }
  async deleteBoca(id) {
   //busca la boca para eliminarlo
    const boca = await models.Boca.findByPk(id);
    if (!boca) {
      throw boom.notFound("Boca not found");
    }
    await boca.destroy();
    return { message: "Boca deleted successfully", id };
  }
}

module.exports = BocaService;