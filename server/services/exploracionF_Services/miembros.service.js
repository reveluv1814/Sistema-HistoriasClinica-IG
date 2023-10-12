const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class MiembrosService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el miembro
    const newMiembro= await models.Miembros.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el miembro creado
    await models.ExploracionF.update(
      { miembrosId: newMiembro.id },
      { where: { id: exploracionFId } }
    );

    return newMiembro;
  }
  async updateMiembro(data, id) {
    // Busca el miembro por su ID
    const miembro = await models.Miembros.findByPk(id);

    if (!miembro) {
      throw boom.notFound("Miembro not found");
    }
    const newMiembro = await miembro.update(data);

    return newMiembro;
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