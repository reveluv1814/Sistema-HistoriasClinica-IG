const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class CuelloService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el cuello
    const newCuello= await models.Cuello.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el cuello creado
    await models.ExploracionF.update(
      { cuelloId: newCuello.id },
      { where: { id: exploracionFId } }
    );

    return newCuello;
  }
  async updateCuello(data, id) {
    // Busca el cuello por su ID
    const cuello = await models.Cuello.findByPk(id);

    if (!cuello) {
      throw boom.notFound("Cuello not found");
    }
    const newCuello = await cuello.update(data);

    return newCuello;
  }
  async deleteCuello(id) {
   //busca el cuello para eliminarlo
    const cuello = await models.Cuello.findByPk(id);
    if (!cuello) {
      throw boom.notFound("Cuello not found");
    }
    await cuello.destroy();
    return { message: "Cuello deleted successfully", id };
  }
}

module.exports = CuelloService;