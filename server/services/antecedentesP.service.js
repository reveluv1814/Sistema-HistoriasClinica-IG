const boom = require("@hapi/boom");
const { models, sequelize } = require("./../libs/sequelize");

class AntecedentePService {
  constructor() {}

  async create(data, historiaClinicaId) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const newAntecedentePersonal = await models.AntecedentesP.create(data, {
        transaction,
      });
      // Luego, actualiza la historia clínica con el ID del antecedente familiar creado
      await models.HistoriaClinica.update(
        { antecedentePId: newAntecedentePersonal.id },
        { where: { id: historiaClinicaId }, transaction }
      );
      await transaction.commit();
      return newAntecedentePersonal;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  async updateAntecedenteP(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const antecedenteP = await models.AntecedentesP.findByPk(id, {
        transaction,
      });

      if (!antecedenteP) {
        throw boom.notFound("Antecedente Personal not found");
      }
      const newAntecedentePersonal = await antecedenteP.update(data, {
        transaction,
      });
      await transaction.commit();
      return newAntecedentePersonal;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  async deleteAntecedenteP(id) {
    //busca el antecedente f para eliminarlo
    const antecedenteP = await models.AntecedentesP.findByPk(id);
    if (!antecedenteP) {
      throw boom.notFound("Antecedente Personal not found");
    }
    await antecedenteP.destroy();
    return { message: "Antecedente Personal deleted successfully", id };
  }
}

module.exports = AntecedentePService;
