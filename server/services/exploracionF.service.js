const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class ExploracionFService {
  constructor() {}

  async create(data, historiaClinicaId) {
    // Primero, crea la exploracion fisica
    const newExploracionF = await models.ExploracionF.create(data);

    // Luego, actualiza la historia clínica con el ID de la exploracion fisica creada
    await models.HistoriaClinica.update(
      { exploracionFId: newExploracionF.id },
      { where: { id: historiaClinicaId } }
    );

    return newExploracionF;
  }
  async updateExploracionF(data, id) {
    // Busca la exploracion fisica por su ID
    const exploracionF = await models.ExploracionF.findByPk(id);

    if (!exploracionF) {
      throw boom.notFound("Exploracion Fisica not found");
    }
    const newExploracionF = await exploracionF.update(data);

    return newExploracionF;
  }
  async deleteExploracionF(id) {
   //busca la ex ploracion f para eliminarlo
    const exploracionF = await models.ExploracionF.findByPk(id);
    if (!exploracionF) {
      throw boom.notFound("Exploracion Fisica not found");
    }
    await exploracionF.destroy();
    return { message: "Exploracion Fisica deleted successfully", id };
  }
}

module.exports = ExploracionFService;
