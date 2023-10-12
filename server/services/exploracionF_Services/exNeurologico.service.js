const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class ExNeurologicoService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea el exNeurologico
    const newExNeurologico= await models.ExNeurologico.create(data);

    // Luego, actualiza la exploracion fisica con el ID de el exNeurologico creado
    await models.ExploracionF.update(
      { exNeurologicoId: newExNeurologico.id },
      { where: { id: exploracionFId } }
    );

    return newExNeurologico;
  }
  async updateExNeurologico(data, id) {
    // Busca el exNeurologico por su ID
    const exNeurologico = await models.ExNeurologico.findByPk(id);

    if (!exNeurologico) {
      throw boom.notFound("ExNeurologico not found");
    }
    const newExNeurologico = await exNeurologico.update(data);

    return newExNeurologico;
  }
  async deleteExNeurologico(id) {
   //busca el exNeurologico para eliminarlo
    const exNeurologico = await models.ExNeurologico.findByPk(id);
    if (!exNeurologico) {
      throw boom.notFound("ExNeurologico not found");
    }
    await exNeurologico.destroy();
    return { message: "ExNeurologico deleted successfully", id };
  }
}

module.exports = ExNeurologicoService ;