const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");

class HistoriaLaboService {
  constructor() {}
  async createHistoriaLabo(data, idPaciente) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const rta = await models.P_creaPac.findOne(
        {
          where: { pacienteId: idPaciente },
        },
        { transaction }
      );
      if (!rta) throw boom.notFound("Historia not found");

      const newHistoriaLabo = await models.HistoriaLabo.create(
        {
          ...data,
          historiaId: rta.historiaId,
        },
        { transaction }
      );
      await transaction.commit();
      return newHistoriaLabo;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateHistoriaLabo(data, id) {
    // Busca el HistoriaLabo por su ID
    const historiaLabo = await models.HistoriaLabo.findByPk(id);

    if (!historiaLabo) {
      throw boom.notFound("HistoriaLabo not found");
    }
    const newHistoriaLabo = await historiaLabo.update(data);

    return newHistoriaLabo;
  }
  async deleteHistoriaLabo(id) {
    //busca el HistoriaLabo para eliminarlo
    const historiaLabo = await models.HistoriaLabo.findByPk(id);
    if (!historiaLabo) {
      throw boom.notFound("HistoriaLabo not found");
    }
    await historiaLabo.destroy();
    return { message: "HistoriaLabo deleted successfully", id };
  }
}

module.exports = HistoriaLaboService;
