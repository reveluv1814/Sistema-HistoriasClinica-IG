const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class CraneoFService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el craneo facial
    const newCraneoF = await models.CraneoF.create(data);

    // Luego, actualiza la exploracion fisica con el ID del craneo facial creado
    await models.ExploracionF.update(
      { craneoFId: newCraneoF.id },
      { where: { id: exploracionFId } }
    );

    return newCraneoF;
  }
  async updateCraneoF(data, id) {
    // Busca el craneo facial por su ID
    const craneoF = await models.CraneoF.findByPk(id);

    if (!craneoF) {
      throw boom.notFound("Craneo Facial not found");
    }
    const newCraneoF = await craneoF.update(data);

    return newCraneoF;
  }
  async deleteCraneoF(id) {
   //busca craneo f para eliminarlo
    const craneoF = await models.CraneoF.findByPk(id);
    if (!craneoF) {
      throw boom.notFound("Craneo Facial not found");
    }
    await craneoF.destroy();
    return { message: "Craneo Facial deleted successfully", id };
  }
}

module.exports = CraneoFService;
