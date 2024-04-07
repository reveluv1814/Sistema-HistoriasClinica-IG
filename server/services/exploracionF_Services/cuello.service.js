const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class CuelloService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newCuello = await models.Cuello.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de el cuello creado
      await models.ExploracionF.update(
        { cuelloId: newCuello.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newCuello;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateCuello(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const cuello = await models.Cuello.findByPk(id, { transaction });

      if (!cuello) {
        throw boom.notFound("Cuello not found");
      }
      const newCuello = await cuello.update(data, { transaction });
      await transaction.commit();
      return newCuello;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
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
