const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class DoctorService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Doctor.findAndCountAll({
      where: {
        "$persona.apellidoPaterno$": {
          [Op.iLike]: `%${q}%`,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: "usuario",
          attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
        {
          model: models.Persona,
          as: "persona",
          attributes: [
            "id",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "ci",
          ], // Especifica los atributos de persona que deseas mostrar
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
    const user = await models.Doctor.findByPk(id, {
      include: [
        {
          model: models.Usuario,
          as: "usuario",
          attributes: ["id", "email", "rol", "createdAt"], // Especifica los atributos de usuario que deseas mostrar
        },
        {
          model: models.Persona,
          as: "persona",
        },
      ],
    });
    if (!user) {
      throw boom.notFound("doctor no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.Doctor.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.Doctor.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const { usuario, persona, doctor } = data;

    const newUsuario = await models.Usuario.create(usuario);
    const newPersona = await models.Persona.create(persona);

    const newDoctor = await models.Doctor.create({
      ...doctor,
      usuarioId: newUsuario.id,
      personaId: newPersona.id,
    });
    return newDoctor;
  }

  async update(id, changes) {
    const { doctor, usuario, persona } = changes;
    const docBuscado = await models.Doctor.findOne({ where: { id } });

    // Actualiza el registro de Usuario
    const updatedUsuario = await models.Usuario.update(usuario, {
      where: { id: docBuscado.usuarioId }, // Utiliza el ID del Usuario asociado al Doctor
    });

    // Actualiza el registro de Persona
    const updatedPersona = await models.Persona.update(persona, {
      where: { id: docBuscado.personaId }, // Utiliza el ID de la Persona asociada al Doctor
    });

    // Actualiza el registro de Doctor
    const updatedDoctor = await models.Doctor.update(doctor, {
      where: { id },
    });

    const [rowCount] = updatedDoctor; // Obtiene la cantidad de filas actualizadas
    if (rowCount === 0) {
      // Manejo de error: No se encontró el registro para actualizar
      throw new Error("No se encontró el registro para actualizar");
    }

    /* const updatedRecord = await models.Doctor.findByPk(id); // Consulta el registro actualizado */
    return updatedDoctor;
  }
  async delete(id) {
    const doctor = await models.Doctor.findByPk(id);
    if (!doctor) {
      throw new Error("No se encontró el registro del Doctor");
    }
    await models.Doctor.destroy({
      where: { id },
    });

    await models.Usuario.destroy({ where: { id: doctor.usuarioId } });
    await models.Persona.destroy({ where: { id: doctor.personaId } });
    return { id };
  }
  async deleteUsuario(id) {
    await models.Doctor.destroy({
      where: { usuarioId: id },
    });
    return { rta: true };
  }
}

module.exports = DoctorService;
