const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class NarizService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newNariz = await models.Nariz.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de los ojos creados
      await models.ExploracionF.update(
        { narizId: newNariz.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newNariz;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateNariz(data, id) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const nariz = await models.Nariz.findByPk(id, { transaction });

      if (!nariz) {
        throw boom.notFound("Nariz not found");
      }
      const newNariz = await nariz.update(data, { transaction });
      await transaction.commit();
      return newNariz;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteNariz(id) {
    //busca la nariz para eliminarlo
    const nariz = await models.Nariz.findByPk(id);
    if (!nariz) {
      throw boom.notFound("Nariz not found");
    }
    await nariz.destroy();
    return { message: "Nariz deleted successfully", id };
  }
}

module.exports = NarizService;
