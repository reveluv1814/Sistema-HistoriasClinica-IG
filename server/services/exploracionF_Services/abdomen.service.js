const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class AbdomenService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el abdomen
    const newAbdomen= await models.Abdomen.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el abdomen creado
    await models.ExploracionF.update(
      { abdomenId: newAbdomen.id },
      { where: { id: exploracionFId } }
    );

    return newAbdomen;
  }
  async updateAbdomen(data, id) {
    // Busca el abdomen por su ID
    const abdomen = await models.Abdomen.findByPk(id);

    if (!abdomen) {
      throw boom.notFound("Abdomen not found");
    }
    const newAbdomen = await abdomen.update(data);

    return newAbdomen;
  }
  async deleteAbdomen(id) {
   //busca el abdomen para eliminarlo
    const abdomen = await models.Abdomen.findByPk(id);
    if (!abdomen) {
      throw boom.notFound("Abdomen not found");
    }
    await abdomen.destroy();
    return { message: "Abdomen deleted successfully", id };
  }
}

module.exports = AbdomenService ;