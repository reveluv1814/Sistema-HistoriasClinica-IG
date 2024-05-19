const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class ExNeurologicoService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newExNeurologico = await models.ExNeurologico.create(data, {
        transaction,
      });

      // Luego, actualiza la exploracion fisica con el ID de el exNeurologico creado
      await models.ExploracionF.update(
        { exNeurologicoId: newExNeurologico.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newExNeurologico;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateExNeurologico(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const exNeurologico = await models.ExNeurologico.findByPk(id, {
        transaction,
      });

      if (!exNeurologico) {
        throw boom.notFound("ExNeurologico not found");
      }
      const newExNeurologico = await exNeurologico.update(data, {
        transaction,
      });
      await transaction.commit();
      return newExNeurologico;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteExNeurologico(id) {
    //busca el exNeurologico para eliminarlo
    const exNeurologico = await models.ExNeurologico.findByPk(id);
    if (!exNeurologico) {
      throw boom.notFound("ExNeurologico not found");
    }
    await exNeurologico.destroy();
    return { message: "ExNeurologico deleted successfully", id };
  }
}

module.exports = ExNeurologicoService;
