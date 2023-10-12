const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class ComposicionFService {
  constructor() {}

  async create(data, historiaClinicaId) {
    // crea la composicion familiar
    const newComposicionFam = await models.ComposicionF.create({...data,historiaId: historiaClinicaId} );
    
    return newComposicionFam;
  }
  async updateComposicionF(data, id) {
    // Busca el antecedente por su ID
    const composicionFam = await models.ComposicionF.findByPk(id);

    if (!composicionFam) {
      throw boom.notFound("Composicion Familiar not found");
    }
    const newComposicionFam = await composicionFam.update(data);

    return newComposicionFam;
  }
  async deleteComposicionF(id) {
   //busca el antecedente f para eliminarlo
    const composicionFam = await models.ComposicionF.findByPk(id);
    if (!composicionFam) {
      throw boom.notFound("Composicion Familiar not found");
    }
    await composicionFam.destroy();
    return { message: "Composicion Familiar deleted successfully", id };
  }
}

module.exports = ComposicionFService;
