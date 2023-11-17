const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class HistoriaLaboService {
  constructor() {}
  async createHistoriaLabo(data, idHistoriaClinica) {
    try {
      /* const { historiaLabo } = data;
  
      const historia = await models.HistoriaClinica.findByPk(historiaLabo.historiaId);
      if (!historia) {
        throw new Error("Historia clínica no encontrada");
      }
  
      const laboratorista = await models.Laboratorista.findByPk(historiaLabo.laboratoristaId);
      if (!laboratorista) {
        throw new Error("Laboratorista no encontrado");
      } */

      const newHistoriaLabo = await models.HistoriaLabo.create({
        ...data,
        historiaId: idHistoriaClinica,
      });

      return newHistoriaLabo;
    } catch (error) {
      throw new Error(
        `Error al crear la relación HistoriaLabo: ${error.message}`
      );
    }
  }
  async updateHistoriaLabo(data, id) {
    // Busca el HistoriaLabo por su ID
    const historiaLabo = await models.HistoriaLabo.findByPk(id);

    if (!historiaLabo) {
      throw boom.notFound("HistoriaLabo not found");
    }
    const newHistoriaLabo = await historiaLabo.update(data);

    return newHistoriaLabo;
  }
  async deleteHistoriaLabo(id) {
    //busca el HistoriaLabo para eliminarlo
    const historiaLabo = await models.HistoriaLabo.findByPk(id);
    if (!historiaLabo) {
      throw boom.notFound("HistoriaLabo not found");
    }
    await historiaLabo.destroy();
    return { message: "HistoriaLabo deleted successfully", id };
  }
}

module.exports = HistoriaLaboService;
