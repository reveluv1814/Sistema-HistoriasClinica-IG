const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class PielAnexosService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newPielAnexos = await models.PielAnexos.create(data, {
        transaction,
      });

      // Luego, actualiza la exploracion fisica con el ID de el pielAnexos creado
      await models.ExploracionF.update(
        { pielAnexosId: newPielAnexos.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newPielAnexos;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updatePielAnexos(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const pielAnexos = await models.PielAnexos.findByPk(id, { transaction });

      if (!pielAnexos) {
        throw boom.notFound("PielAnexos not found");
      }
      const newPielAnexos = await pielAnexos.update(data, { transaction });
      await transaction.commit();
      return newPielAnexos;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deletePielAnexos(id) {
    //busca el PielAnexos para eliminarlo
    const pielAnexos = await models.PielAnexos.findByPk(id);
    if (!pielAnexos) {
      throw boom.notFound("PielAnexos not found");
    }
    await pielAnexos.destroy();
    return { message: "PielAnexos deleted successfully", id };
  }
}

module.exports = PielAnexosService;
