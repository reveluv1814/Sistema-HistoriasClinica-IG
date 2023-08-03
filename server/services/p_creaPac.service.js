const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class PcPacService {
  constructor() {}

  async find() {
    const rta = await models.P_creaPac.findAll({
        include: [
          {
            model: models.Paciente,
            as: "paciente",
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
          {
            model: models.HistoriaClinica,
            as: "historia",
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
        ],
        order: [["id"]], // Ordenar por fecha de creación en orden ascendente
      });
      return rta;
  }
}

module.exports = PcPacService;
