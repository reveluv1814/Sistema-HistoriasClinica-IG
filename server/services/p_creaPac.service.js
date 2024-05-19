const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class PcPacService {
  constructor() {}

  async findPacHis(id) {
    const rta = await models.P_creaPac.findOne({
      where: { pacienteId: id },
      attributes: ["historiaId"],
    });
    if (!rta) {
      throw new Error(
        "No se encontró una relación entre el paciente y su historia clínica."
      );
    }

    return rta;
  }
}

module.exports = PcPacService;
