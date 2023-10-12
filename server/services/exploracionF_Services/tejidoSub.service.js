const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class TejidoSubService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el tejidoSub
    const newtejidoSub= await models.TejidoSub.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el tejidoSub creado
    await models.ExploracionF.update(
      { tejidoSubId: newtejidoSub.id },
      { where: { id: exploracionFId } }
    );

    return newtejidoSub;
  }
  async updateTejidoSub(data, id) {
    // Busca el tejidoSub por su ID
    const tejidoSub = await models.TejidoSub.findByPk(id);

    if (!tejidoSub) {
      throw boom.notFound("TejidoSub not found");
    }
    const newTejidoSub = await tejidoSub.update(data);

    return newTejidoSub;
  }
  async deleteTejidoSub(id) {
   //busca el tejidoSub para eliminarlo
    const tejidoSub = await models.TejidoSub.findByPk(id);
    if (!tejidoSub) {
      throw boom.notFound("TejidoSub not found");
    }
    await tejidoSub.destroy();
    return { message: "TejidoSub deleted successfully", id };
  }
}

module.exports = TejidoSubService ;