const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class MusculaturaService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea la musculatura
    const newMusculatura= await models.Musculatura.create(data);

    // Luego, actualiza la exploracion fisica con el ID de la musculatura creada
    await models.ExploracionF.update(
      { musculaturaId: newMusculatura.id },
      { where: { id: exploracionFId } }
    );

    return newMusculatura;
  }
  async updateMusculatura(data, id) {
    // Busca la musculatura por su ID
    const musculatura = await models.Musculatura.findByPk(id);

    if (!musculatura) {
      throw boom.notFound("Musculatura not found");
    }
    const newMusculatura = await musculatura.update(data);

    return newMusculatura;
  }
  async deleteMusculatura(id) {
   //busca la musculatura para eliminarlo
    const musculatura = await models.Musculatura.findByPk(id);
    if (!musculatura) {
      throw boom.notFound("Musculatura not found");
    }
    await musculatura.destroy();
    return { message: "Musculatura deleted successfully", id };
  }
}

module.exports = MusculaturaService;