const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class ExploracionFService {
  constructor() {}

  async findOne(id) {
    const exploracionF = await models.ExploracionF.findByPk(id,{
      include: [
        {
          model: models.CraneoF,
          as: "craneoF",
        },
        {
          model: models.Orejas,
          as: "orejas",
        },
        {
          model: models.Ojos,
          as: "ojos",
        },
        {
          model: models.Nariz,
          as: "nariz",
        },
        {
          model: models.MaxMandibula,
          as: "maxMandibula",
        },
        {
          model: models.Boca,
          as: "boca",
        },
        {
          model: models.Cuello,
          as: "cuello",
        },
        {
          model: models.Torax,
          as: "torax",
        },
        {
          model: models.Columna,
          as: "columna",
        },
        {
          model: models.Abdomen,
          as: "abdomen",
        },
        {
          model: models.TejidoSub,
          as: "tejidoSub",
        },
        {
          model: models.Musculatura,
          as: "musculatura",
        },
        {
          model: models.ExNeurologico,
          as: "exNeurologico",
        },
        {
          model: models.PielAnexos,
          as: "pielAnexos",
        },
        {
          model: models.GenitalesEx,
          as: "genitalesEx",
        },
        {
          model: models.Miembros,
          as: "miembros",
        },
      ],
    });
    if (!exploracionF) throw boom.notFound("exploracionF not found");
    return exploracionF;
  }

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
