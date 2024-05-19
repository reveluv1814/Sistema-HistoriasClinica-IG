const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class OrejasService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newOrejas = await models.Orejas.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de las orejas creadas
      await models.ExploracionF.update(
        { orejasId: newOrejas.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newOrejas;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateOrejas(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const orejas = await models.Orejas.findByPk(id, { transaction });

      if (!orejas) {
        throw boom.notFound("Orejas not found");
      }
      const newOrejas = await orejas.update(data, { transaction });
      await transaction.commit();
      return newOrejas;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteOrejas(id) {
    //busca orejas para eliminarlo
    const orejas = await models.Orejas.findByPk(id);
    if (!orejas) {
      throw boom.notFound("Orejas not found");
    }
    await orejas.destroy();
    return { message: "Orejas deleted successfully", id };
  }
}

module.exports = OrejasService;
