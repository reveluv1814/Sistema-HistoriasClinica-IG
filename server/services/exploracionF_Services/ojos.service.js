const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class OjosService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea los ojos
    const newOjos = await models.Ojos.create(data);

    // Luego, actualiza la exploracion fisica con el ID de los ojos creados
    await models.ExploracionF.update(
      { ojosId: newOjos.id },
      { where: { id: exploracionFId } }
    );

    return newOjos;
  }
  async updateOjos(data, id) {
    // Busca ojos por su ID
    const ojos = await models.Ojos.findByPk(id);

    if (!ojos) {
      throw boom.notFound("Ojos not found");
    }
    const newOjos = await ojos.update(data);

    return newOjos;
  }
  async deleteOjos(id) {
   //busca ojos para eliminarlo
    const ojos = await models.Ojos.findByPk(id);
    if (!ojos) {
      throw boom.notFound("Ojos not found");
    }
    await ojos.destroy();
    return { message: "Ojos deleted successfully", id };
  }
}

module.exports = OjosService;
