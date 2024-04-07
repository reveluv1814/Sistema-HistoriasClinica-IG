const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class MaxMandibulaService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newMaxMandibula = await models.MaxMandibula.create(data, {
        transaction,
      });

      // Luego, actualiza la exploracion fisica con el ID de la maxMandibula creada
      await models.ExploracionF.update(
        { maxMandibulaId: newMaxMandibula.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newMaxMandibula;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateMaxMandibula(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const maxMandibula = await models.MaxMandibula.findByPk(id, {
        transaction,
      });

      if (!maxMandibula) {
        throw boom.notFound("MaxMandibula not found");
      }
      const newMaxMandibula = await maxMandibula.update(data, { transaction });
      await transaction.commit();
      return newMaxMandibula;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteMaxMandibula(id) {
    //busca la MaxMandibula para eliminarlo
    const maxMandibula = await models.MaxMandibula.findByPk(id);
    if (!maxMandibula) {
      throw boom.notFound("MaxMandibula not found");
    }
    await maxMandibula.destroy();
    return { message: "MaxMandibula deleted successfully", id };
  }
}

module.exports = MaxMandibulaService;
