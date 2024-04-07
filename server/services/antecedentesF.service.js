const boom = require("@hapi/boom");
const { models, sequelize } = require("./../libs/sequelize");

class AntecedenteFService {
  constructor() {}

  async create(data, historiaClinicaId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newAntecedenteFamiliar = await models.AntecedentesF.create(data, {
        transaction,
      });

      await models.HistoriaClinica.update(
        { antecedenteFId: newAntecedenteFamiliar.id },
        { where: { id: historiaClinicaId }, transaction }
      );
      await transaction.commit();
      return newAntecedenteFamiliar;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async findOne(id) {
    const historia = await models.HistoriaClinica.findByPk(id);
    if (!historia) throw boom.notFound("Historia not found");
    const antecedenteF = await models.AntecedentesF.findByPk(
      historia.antecedenteFId
    );
    if (!antecedenteF) throw boom.notFound("Antecedente Familiar not found");
    return antecedenteF;
  }
  async updateAntecedenteF(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Busca el antecedente por su ID
      const antecedenteF = await models.AntecedentesF.findByPk(id, {
        transaction,
      });

      if (!antecedenteF) {
        throw boom.notFound("Antecedente Familiar not found");
      }
      const newAntecedenteFamiliar = await antecedenteF.update(data, {
        transaction,
      });
      await transaction.commit();

      return newAntecedenteFamiliar;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async deleteAntecedenteF(id) {
    const antecedenteF = await models.AntecedentesF.findByPk(id);
    if (!antecedenteF) {
      throw boom.notFound("Antecedente Familiar not found");
    }
    await antecedenteF.destroy();
    return { message: "Antecedente Familiar deleted successfully", id };
  }
}

module.exports = AntecedenteFService;
