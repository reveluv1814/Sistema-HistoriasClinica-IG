const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class ToraxService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newTorax = await models.Torax.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de el torax creado
      await models.ExploracionF.update(
        { toraxId: newTorax.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newTorax;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateTorax(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const torax = await models.Torax.findByPk(id, { transaction });

      if (!torax) {
        throw boom.notFound("Torax not found");
      }
      const newTorax = await torax.update(data, { transaction });
      await transaction.commit();
      return newTorax;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteTorax(id) {
    //busca el torax para eliminarlo
    const torax = await models.Torax.findByPk(id);
    if (!torax) {
      throw boom.notFound("Torax not found");
    }
    await torax.destroy();
    return { message: "Torax deleted successfully", id };
  }
}

module.exports = ToraxService;
