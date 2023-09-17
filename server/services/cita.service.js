const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models } = require("./../libs/sequelize");
const HistoriaPac = require("./p_creaPac.service");

class CitaService {
  constructor() {}

  async create(data) {
    const historiaPAc = new HistoriaPac();
    const { cita } = data;
    const pacienteId = cita.pacienteId;
    const historiaId = await historiaPAc.findPacHis(pacienteId);
    const newCita = await models.Cita.create({
      ...cita,
      historiaId: historiaId.historiaId,
    });
    return newCita;
  }

  async find() {
    const rta = await models.Cita.findAndCountAll({
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
        {
          model: models.Paciente,
          as: "paciente",
          attributes: ["residencia"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("paciente.persona.nombre"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          attributes: ["cargo"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("personalAd.persona.nombre"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
      ],
      order: [
        ["id"], // ordenar por fecha de creación en orden ascendente
      ],
    });

    return rta;
  }

  async findOne(id) {
    const cita = await models.Cita.findByPk(id, {
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
        {
          model: models.Paciente,
          as: "paciente",
          attributes: ["residencia"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("paciente.persona.nombre"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          attributes: ["cargo"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("personalAd.persona.nombre"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
      ],
    });
    if (!cita) throw boom.notFound("Cita not found");
    return cita;
  }
  async findPersonal(id) {
    const cita = await models.Cita.findAll({
      where: { personalAdId: id, estado: true },
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
        {
          model: models.Paciente,
          as: "paciente",
          attributes: ["residencia"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("paciente.persona.nombre"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("paciente.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
        {
          model: models.PersonalAdmin,
          as: "personalAd",
          attributes: ["cargo"],
          include: [
            {
              model: models.Persona,
              as: "persona",
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("personalAd.persona.nombre"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoPaterno"),
                    " ",
                    Sequelize.col("personalAd.persona.apellidoMaterno")
                  ),
                  "nombreCompleto",
                ],
              ],
            },
          ],
        },
      ],
    });
    if (!cita) throw boom.notFound("Cita not found");
    return cita;
  }

  async update(id, changes) {
    //const cita = await this.findOne(id);
    const rta = await models.Cita.update(changes, {
      where: { id },
    });
    const [rowCount] = rta; // Obtiene la cantidad de filas actualizadas
    if (rowCount === 0) {
      // Manejo de error: No se encontró el registro para actualizar
      throw new Error("No se encontró el registro para actualizar");
    }
    return rta;
  }

  async delete(id) {
    const cita = await this.findOne(id);
    if (!cita) {
      throw new Error("No se encontró el registro de la Cita");
    }
    await cita.destroy();
    return { id };
  }
  async deleteCita(citaId) {
    await models.Cita.destroy({
      where: { id: citaId },
    });
    return { citaId };
  }
}

module.exports = CitaService;
