const boom = require("@hapi/boom");
const { models, sequelize } = require("./../../libs/sequelize");

class MiembrosService {
  constructor() {}

  async create(data, exploracionFId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newMiembro = await models.Miembros.create(data, { transaction });

      // Luego, actualiza la exploracion fisica con el ID de el miembro creado
      await models.ExploracionF.update(
        { miembrosId: newMiembro.id },
        { where: { id: exploracionFId }, transaction }
      );
      await transaction.commit();
      return newMiembro;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async updateMiembro(data, id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const miembro = await models.Miembros.findByPk(id, { transaction });

      if (!miembro) {
        throw boom.notFound("Miembro not found");
      }
      const newMiembro = await miembro.update(data, { transaction });
      await transaction.commit();
      return newMiembro;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteMiembro(id) {
    //busca el miembro para eliminarlo
    const miembro = await models.Miembros.findByPk(id);
    if (!miembro) {
      throw boom.notFound("Miembro not found");
    }
    await miembro.destroy();
    return { message: "Miembro deleted successfully", id };
  }
}

module.exports = MiembrosService;
