const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class ColumnaService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newColumna = await models.Columna.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de la columna creada
      await models.ExploracionF.update(
        { columnaId: newColumna.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newColumna;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateColumna(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const columna = await models.Columna.findByPk(id, { transaction });

      if (!columna) {
        throw boom.notFound("Columna not found");
      }
      const newColumna = await columna.update(data, { transaction });
      await transaction.commit();
      return newColumna;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteColumna(id) {
    //busca la columna para eliminarlo
    const columna = await models.Columna.findByPk(id);
    if (!columna) {
      throw boom.notFound("Columna not found");
    }
    await columna.destroy();
    return { message: "Columna deleted successfully", id };
  }
}

module.exports = ColumnaService;
