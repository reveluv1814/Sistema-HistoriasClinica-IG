const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("./../libs/sequelize");
const HistoriaPac = require("./p_creaPac.service");

class CitaService {
  constructor() {}

  async create(data) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const historiaPAc = new HistoriaPac();
      const { cita } = data;
      const pacienteId = cita.pacienteId;
      const historiaId = await historiaPAc.findPacHis(pacienteId);
      if (!historiaId) {
        throw new Error("No se encontró el registro del Paciente");
      }
      const newCita = await models.Cita.create(
        {
          ...cita,
          historiaId: historiaId.historiaId,
        },
        { transaction }
      );
      await transaction.commit();
      return newCita;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async find() {
    const rta = await models.Cita.findAll({
      where: { estado: true },
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
        ["fecha"], // ordenar por fecha de creación en orden ascendente
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
  //busca la cita de id x que el doctor quiera
  async findConsultaDoc(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const cita = await models.Cita.findByPk(id, { transaction });
      if (!cita) throw boom.notFound("Cita not found");
      await transaction.commit();
      return cita;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  //lista las citas del id del personal administrartivo
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
      order: [
        ["fecha"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    if (!cita) throw boom.notFound("Cita not found");
    return cita;
  }
  //lista las citas que debe atender el doctor de id
  async findDoctor(id) {
    const cita = await models.Cita.findAll({
      where: { doctorId: id, estado: true },
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
        ["fecha"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    if (!cita) throw boom.notFound("Cita not found");
    return cita;
  }

  async update(id, changes) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const rta = await models.Cita.update(changes, {
        where: { id },
        transaction,
      });
      const [rowCount] = rta; // Obtiene la cantidad de filas actualizadas
      if (rowCount === 0) {
        // Manejo de error: No se encontró el registro para actualizar
        throw new Error("No se encontró el registro para actualizar");
      }
      await transaction.commit();
      return rta;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async delete(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const cita = await this.findOne(id, { transaction });
      if (!cita) {
        throw new Error("No se encontró el registro de la Cita");
      }
      await cita.destroy({ transaction });
      await transaction.commit();
      return { id };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  async deleteCita(citaId) {
    await models.Cita.destroy({
      where: { id: citaId },
    });
    return { citaId };
  }
}

module.exports = CitaService;
