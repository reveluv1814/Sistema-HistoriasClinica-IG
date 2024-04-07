const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("./../libs/sequelize");
const PacienteService = require("./paciente.service");
const { config } = require("../config/config");
const fs = require("fs");

class HistoriaService {
  constructor() {}

  async create(data) {
    const newHistoria = await models.HistoriaClinica.create(data);
    return newHistoria;
  }

  async find() {
    const rta = await models.HistoriaClinica.findAll();
    return rta;
  }

  async findOne(id) {
    const historia = await models.HistoriaClinica.findByPk(id);
    if (!historia) throw boom.notFound("Historia not found");
    return historia;
  }
  async findPacHis(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const pacienteService = new PacienteService();

      const rta = await models.P_creaPac.findOne({
        where: { pacienteId: id },
        transaction,
      });
      if (!rta) throw boom.notFound("Historia not found");

      //busca los datos del paciente
      const paciente = await pacienteService.findPacienteHistoria(id, {
        transaction,
      });
      if (!paciente) throw boom.notFound("Historia not found");

      const historiaP = await models.HistoriaClinica.findOne({
        where: { id: rta.historiaId },
        include: [
          {
            model: models.AntecedentesF,
            as: "antecedenteF",
          },
          {
            model: models.AntecedentesP,
            as: "antecedenteP",
          },
          {
            model: models.ComposicionF,
            as: "composicionesF",
          },
          {
            model: models.ExploracionF,
            as: "exploracionF",
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
          },
        ],
        transaction,
      });

      if (!historiaP) throw boom.notFound("Historia not found");
      //historiaLabo
      const historiaLaboo = await models.HistoriaLabo.findAll({
        where: { historiaId: rta.historiaId }, // Filtrar por la historia específica
        transaction,
      });
      const laboratoristasPromises = historiaLaboo.map(async (historiaLabo) => {
        //console.log("historiaLabo:", historiaLabo);
        const laboratorista = await models.Laboratorista.findOne({
          where: { id: historiaLabo.laboratoristaId },
          attributes: ["especialidad"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("persona.nombre"),
                    " ",
                    Sequelize.col("persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
          transaction,
        });
        //console.log("laboratorista:", laboratorista);
        return {
          historiaLabo: historiaLabo.get(), // Obtén el objeto plano
          laboratorista: laboratorista ? laboratorista.get() : null, // Verifica si laboratorista existe
        };
      });

      //Citas
      const citas = await models.Cita.findAll({
        where: { historiaId: historiaP.id, estado: false },
        include: [
          {
            model: models.Doctor,
            as: "doctor",
            attributes: ["unidad"],
            include: [
              {
                model: models.Persona,
                as: "persona",
                attributes: [
                  [
                    Sequelize.fn(
                      "CONCAT",
                      Sequelize.col("doctor.persona.nombre"),
                      " ",
                      Sequelize.col("doctor.persona.apellidoPaterno"),
                      " ",
                      Sequelize.col("doctor.persona.apellidoMaterno")
                    ),
                    "nombreCompleto",
                  ],
                ],
              },
            ],
          },
        ],
        transaction,
      });

      const resultadosLabo = await Promise.all(laboratoristasPromises);

      await transaction.commit();
      return { paciente, ...historiaP.toJSON(), resultadosLabo, citas };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async findHis(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const pacienteService = new PacienteService();

      //verifica que exista la relacion ternaria
      const rta = await models.P_creaPac.findOne({
        where: { historiaId: id },
        transaction,
      });
      if (!rta) throw boom.notFound("Historia not found");

      //busca los datos del paciente
      const paciente = await pacienteService.findPacienteHistoria(
        rta.pacienteId
      );
      if (!paciente) throw boom.notFound("Historia not found");

      const historiaP = await models.HistoriaClinica.findOne({
        where: { id: id },
        include: [
          {
            model: models.AntecedentesF,
            as: "antecedenteF",
          },
          {
            model: models.AntecedentesP,
            as: "antecedenteP",
          },
          {
            model: models.ComposicionF,
            as: "composicionesF",
          },
          {
            model: models.ExploracionF,
            as: "exploracionF",
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
          },
        ],
        transaction,
      });

      if (!historiaP) throw boom.notFound("Historia not found");
      await transaction.commit();

      return { paciente, ...historiaP.toJSON() };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async findApartados(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const historiaP = await models.HistoriaClinica.findOne({
        where: { id: id },
        include: [
          {
            model: models.AntecedentesF,
            as: "antecedenteF",
          },
          {
            model: models.AntecedentesP,
            as: "antecedenteP",
          },
          {
            model: models.ComposicionF,
            as: "composicionesF",
          },
          {
            model: models.ExploracionF,
            as: "exploracionF",
          },
        ],
        transaction,
      });

      if (!historiaP) throw boom.notFound("Historia not found");
      await transaction.commit();
      return historiaP;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async update(id, changes) {
    const historia = await this.findOne(id);
    const rta = await historia.update(changes);
    return rta;
  }

  async delete(id) {
    const historia = await this.findOne(id);
    await historia.destroy();
    return { id };
  }
  /* async deleteCita(citaId) {
    await models.Cita.destroy({
      where: { id: citaId }
    });
    return { citaId };
  } */
  async actualizarArbolG(id, file) {
    const historiaP = await models.HistoriaClinica.findOne({
      where: { id },
    });

    const imagenEliminar = historiaP.arbolGene;

    let datos = {};
    if (file) {
      datos.arbolGene = config.urlImagenesBD + "arbolGene/" + file.filename;
    }

    await models.HistoriaClinica.update(datos, {
      where: { id: historiaP.id },
    });

    if (imagenEliminar !== "") {
      fs.unlinkSync(config.urlImagenesEliminarRuta + imagenEliminar);
    }

    return datos.foto;
  }
}

module.exports = HistoriaService;
