const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class AntecedentePService {
  constructor() {}

  async create(data, historiaClinicaId) {
    // Primero, crea el antecedente familiar
    const newAntecedentePersonal = await models.AntecedentesP.create(data);

    // Luego, actualiza la historia clínica con el ID del antecedente familiar creado
    await models.HistoriaClinica.update(
      { antecedentePId: newAntecedentePersonal.id },
      { where: { id: historiaClinicaId } }
    );

    return newAntecedentePersonal;
  }
  async updateAntecedenteP(data, id) {
    // Busca el antecedente por su ID
    const antecedenteP = await models.AntecedentesP.findByPk(id);

    if (!antecedenteP) {
      throw boom.notFound("Antecedente Personal not found");
    }
    const newAntecedentePersonal = await antecedenteP.update(data);

    return newAntecedentePersonal;
  }
  async deleteAntecedenteP(id) {
   //busca el antecedente f para eliminarlo
    const antecedenteP = await models.AntecedentesP.findByPk(id);
    if (!antecedenteP) {
      throw boom.notFound("Antecedente Personal not found");
    }
    await antecedenteP.destroy();
    return { message: "Antecedente Personal deleted successfully", id };
  }
}

module.exports = AntecedentePService;
