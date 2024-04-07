const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class MusculaturaService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newMusculatura = await models.Musculatura.create(data, {
        transaction,
      });

      // Luego, actualiza la exploracion fisica con el ID de la musculatura creada
      await models.ExploracionF.update(
        { musculaturaId: newMusculatura.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newMusculatura;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateMusculatura(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const musculatura = await models.Musculatura.findByPk(id, {
        transaction,
      });

      if (!musculatura) {
        throw boom.notFound("Musculatura not found");
      }
      const newMusculatura = await musculatura.update(data, { transaction });
      await transaction.commit();
      return newMusculatura;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteMusculatura(id) {
    //busca la musculatura para eliminarlo
    const musculatura = await models.Musculatura.findByPk(id);
    if (!musculatura) {
      throw boom.notFound("Musculatura not found");
    }
    await musculatura.destroy();
    return { message: "Musculatura deleted successfully", id };
  }
}

module.exports = MusculaturaService;
