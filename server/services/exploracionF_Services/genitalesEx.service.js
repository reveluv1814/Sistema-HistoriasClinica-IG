const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class GenitalesExService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newGenitalesEx = await models.GenitalesEx.create(data, {
        transaction,
      });

      // Luego, actualiza la exploracion fisica con el ID de un genitalesEx creado
      await models.ExploracionF.update(
        { genitalesExId: newGenitalesEx.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newGenitalesEx;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateGenitalesEx(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const genitalesEx = await models.GenitalesEx.findByPk(id, {
        transaction,
      });

      if (!genitalesEx) {
        throw boom.notFound("GenitalesEx not found");
      }
      const newGenitalesEx = await genitalesEx.update(data, { transaction });
      await transaction.commit();
      return newGenitalesEx;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteGenitalesEx(id) {
    //busca GenitalesEx para eliminarlo
    const genitalesEx = await models.GenitalesEx.findByPk(id);
    if (!genitalesEx) {
      throw boom.notFound("GenitalesEx not found");
    }
    await genitalesEx.destroy();
    return { message: "GenitalesEx deleted successfully", id };
  }
}

module.exports = GenitalesExService;
