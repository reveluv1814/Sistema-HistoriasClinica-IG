const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class OjosService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newOjos = await models.Ojos.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de los ojos creados
      await models.ExploracionF.update(
        { ojosId: newOjos.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newOjos;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateOjos(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const ojos = await models.Ojos.findByPk(id, { transaction });

      if (!ojos) {
        throw boom.notFound("Ojos not found");
      }
      const newOjos = await ojos.update(data, { transaction });
      await transaction.commit();
      return newOjos;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteOjos(id) {
    //busca ojos para eliminarlo
    const ojos = await models.Ojos.findByPk(id);
    if (!ojos) {
      throw boom.notFound("Ojos not found");
    }
    await ojos.destroy();
    return { message: "Ojos deleted successfully", id };
  }
}

module.exports = OjosService;
