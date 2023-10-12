const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class AntecedenteFService {
  constructor() {}

  async create(data, historiaClinicaId) {
    // Primero, crea el antecedente familiar
    const newAntecedenteFamiliar = await models.AntecedentesF.create(data);

    // Luego, actualiza la historia clínica con el ID del antecedente familiar creado
    await models.HistoriaClinica.update(
      { antecedenteFId: newAntecedenteFamiliar.id },
      { where: { id: historiaClinicaId } }
    );

    return newAntecedenteFamiliar;
  }

  /* async find() {
    const rta = await models.Persona.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Persona.findByPk(id);
    if (!user) throw boom.notFound("Persona not found");
    return user;
  } */
  async updateAntecedenteF(data, id) {
    // Busca el antecedente por su ID
    const antecedenteF = await models.AntecedentesF.findByPk(id);

    if (!antecedenteF) {
      throw boom.notFound("Antecedente Familiar not found");
    }
    const newAntecedenteFamiliar = await antecedenteF.update(data);

    return newAntecedenteFamiliar;
  }

  /*  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  } */

  async deleteAntecedenteF(id) {
    // Busca la historia clínica por su ID
    /* const historiaClinica = await models.HistoriaClinica.findByPk(
      historiaClinicaId
    );

    if (!historiaClinica) {
      throw boom.notFound("Historia Clínica not found");
    }

    // Si existe un antecedente familiar, elimínalo y actualiza la historia clínica
    if (historiaClinica.antecedenteF) {
      await historiaClinica.antecedenteF.destroy();
      await historiaClinica.update({ antecedenteFId: null });
    }

    return { message: "Antecedente Familiar deleted successfully" }; */

    //busca el antecedente f para eliminarlo
    const antecedenteF = await models.AntecedentesF.findByPk(id);
    if (!antecedenteF) {
      throw boom.notFound("Antecedente Familiar not found");
    }
    await antecedenteF.destroy();
    return { message: "Antecedente Familiar deleted successfully", id };
  }
  /* async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  } */
}

module.exports = AntecedenteFService;
