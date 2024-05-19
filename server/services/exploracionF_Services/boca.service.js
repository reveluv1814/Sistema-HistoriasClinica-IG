const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class BocaService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newBoca = await models.Boca.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de la boca creada
      await models.ExploracionF.update(
        { bocaId: newBoca.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newBoca;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateBoca(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const boca = await models.Boca.findByPk(id, { transaction });

      if (!boca) {
        throw boom.notFound("Boca not found");
      }
      const newBoca = await boca.update(data, { transaction });
      await transaction.commit();
      return newBoca;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
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
