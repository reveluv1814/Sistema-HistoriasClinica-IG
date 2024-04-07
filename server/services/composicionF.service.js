const boom = require("@hapi/boom");
const { models, sequelize } = require("./../libs/sequelize");

class ComposicionFService {
  constructor() {}

  async create(data, historiaClinicaId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const newComposicionFam = await models.ComposicionF.create(
        { ...data, historiaId: historiaClinicaId },
        { transaction }
      );

      await transaction.commit();

      return newComposicionFam;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  async updateComposicionF(data, id) {
    // Busca el antecedente por su ID
    const composicionFam = await models.ComposicionF.findByPk(id);

    if (!composicionFam) {
      throw boom.notFound("Composicion Familiar not found");
    }
    const newComposicionFam = await composicionFam.update(data);

    return newComposicionFam;
  }
  async deleteComposicionF(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const composicionFam = await models.ComposicionF.findByPk(id, {
        transaction,
      });

      if (!composicionFam) {
        throw boom.notFound("Composicion Familiar not found");
      }

      await composicionFam.destroy({ transaction });

      await transaction.commit();

      return { message: "Composicion Familiar deleted successfully", id };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
}

module.exports = ComposicionFService;
