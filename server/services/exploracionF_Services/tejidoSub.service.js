const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class TejidoSubService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newtejidoSub = await models.TejidoSub.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de el tejidoSub creado
      await models.ExploracionF.update(
        { tejidoSubId: newtejidoSub.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newtejidoSub;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateTejidoSub(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const tejidoSub = await models.TejidoSub.findByPk(id, { transaction });

      if (!tejidoSub) {
        throw boom.notFound("TejidoSub not found");
      }
      const newTejidoSub = await tejidoSub.update(data, { transaction });
      await transaction.commit();
      return newTejidoSub;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
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

module.exports = TejidoSubService;
