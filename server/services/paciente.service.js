const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("./../libs/sequelize");
const { config } = require("../config/config");
const fs = require("fs");

class PacienteService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Paciente.findAndCountAll({
      include: [
        {
          model: models.Persona,
          as: "persona",
          attributes: [
            "id",
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("nombre"),
                " ",
                Sequelize.col("apellidoPaterno"),
                " ",
                Sequelize.col("apellidoMaterno")
              ),
              "nombreCompleto",
            ],
            "ci",
            "telefono",
            "direccion",
            "foto",
            "es_persona",
            "createdAt",
          ],
          where: {
            ci: {
              [Op.iLike]: `%${q}%`,
            },
          },
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                "id",
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("nombre"),
                    " ",
                    Sequelize.col("apellidoPaterno"),
                    " ",
                    Sequelize.col("apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
                "ci",
              ],
            },
          ],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    return rta;
  }

  async findOne(id) {
    const paciente = await models.Paciente.findByPk(id, {
      include: [
        {
          model: models.Persona,
          as: "persona",
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                "id",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "ci",
              ],
            },
          ],
        },
      ],
    });
    if (!paciente) throw boom.notFound("Paciente not found");
    return paciente;
  }
  async findPacienteHistoria(id) {
    const paciente = await models.Paciente.findByPk(id, {
      include: [
        {
          model: models.Persona,
          as: "persona",
        },
      ],
    });
    if (!paciente) throw boom.notFound("Paciente not found");
    return paciente;
  }
  async create(data) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const { paciente, persona, personalAdmin } = data;

      const newPersona = await models.Persona.create(persona, { transaction });

      const newPaciente = await models.Paciente.create(
        {
          ...paciente,
          personaId: newPersona.id,
        },
        { transaction }
      );
      const newHistoria = await models.HistoriaClinica.create(
        { arbolGene: "" },
        { transaction }
      );
      await models.P_creaPac.create(
        {
          ...personalAdmin,
          pacienteId: newPaciente.id,
          historiaId: newHistoria.id,
        },
        { transaction }
      );
      await transaction.commit();
      return newPersona.id;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  async update(id, changes) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const { paciente, persona } = changes;
      const pacienteBuscado = await models.Paciente.findOne({ where: { id } });
      if (!pacienteBuscado) {
        throw new Error("No se encontró el registro del Paciente");
      }

      // Actualiza el registro de Usuario
      await models.Persona.update(persona, {
        where: { id: pacienteBuscado.personaId },
        transaction,
      });

      const updatedPaciente = await models.Paciente.update(paciente, {
        where: { id },
        transaction,
      });

      const [rowCount] = updatedPaciente; // Obtiene la cantidad de filas actualizadas
      if (rowCount === 0) {
        // Manejo de error: No se encontró el registro para actualizar
        throw new Error("No se encontró el registro para actualizar");
      }
      await transaction.commit();
      return updatedPaciente;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  async delete(id) {
    const paciente = await models.Paciente.findByPk(id);
    if (!paciente) {
      throw new Error("No se encontró el registro del Paciente");
    }
    await models.P_creaPac.destroy({ where: { pacienteId: id } });
    await models.Paciente.destroy({
      where: { id },
    });
    await models.Persona.destroy({ where: { id: paciente.personaId } });
    return { id };
  }
  async deletePaciente(pacienteId) {
    await models.Paciente.destroy({
      where: { id: pacienteId },
    });
    return { pacienteId };
  }

  //foto

  async fotoPaciente(id, req) {
    let datos = {};
    if (req) {
      datos.foto = config.urlImagenesBD + "pacientes/" + req.filename;
    }
    await models.Persona.update(datos, {
      where: { id: id },
    });
    return datos.foto;
  }
  async actualizarFotoPaciente(id, file) {
    const pacienteBuscado = await models.Paciente.findOne({ where: { id } });
    if (!pacienteBuscado) {
      throw new Error("No se encontró el Paciente");
    }

    const personaBuscada = await models.Persona.findOne({
      where: { id: pacienteBuscado.personaId },
    });
    if (!personaBuscada) {
      throw new Error("No se encontró la Persona asociada al Paciente");
    }

    const imagenEliminar = personaBuscada.foto;

    let datos = {};
    if (file) {
      datos.foto = config.urlImagenesBD + "pacientes/" + file.filename;
    }

    await models.Persona.update(datos, {
      where: { id: personaBuscada.id },
    });

    if (imagenEliminar !== "") {
      fs.unlinkSync(config.urlImagenesEliminarRuta + imagenEliminar);
    }

    return datos.foto;
  }
}

module.exports = PacienteService;
