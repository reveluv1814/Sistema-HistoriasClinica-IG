const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class CraneoFService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newCraneoF = await models.CraneoF.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID del craneo facial creado
      await models.ExploracionF.update(
        { craneoFId: newCraneoF.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newCraneoF;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateCraneoF(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      // Busca el craneo facial por su ID
      const craneoF = await models.CraneoF.findByPk(id, { transaction });

      if (!craneoF) {
        throw boom.notFound("Craneo Facial not found");
      }
      const newCraneoF = await craneoF.update(data, { transaction });
      await transaction.commit();

      return newCraneoF;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
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
