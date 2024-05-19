const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class AbdomenService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newAbdomen = await models.Abdomen.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de el abdomen creado
      await models.ExploracionF.update(
        { abdomenId: newAbdomen.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newAbdomen;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateAbdomen(data, id) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const abdomen = await models.Abdomen.findByPk(id, { transaction });

      if (!abdomen) {
        throw boom.notFound("Abdomen not found");
      }
      const newAbdomen = await abdomen.update(data, { transaction });
      await transaction.commit();
      return newAbdomen;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteAbdomen(id) {
    //busca el abdomen para eliminarlo
    const abdomen = await models.Abdomen.findByPk(id);
    if (!abdomen) {
      throw boom.notFound("Abdomen not found");
    }
    await abdomen.destroy();
    return { message: "Abdomen deleted successfully", id };
  }
}

module.exports = AbdomenService;
