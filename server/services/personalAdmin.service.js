const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class PersonalAdminService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.PersonalAdmin.findAndCountAll({
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
    const user = await models.PersonalAdmin.findByPk(id, {
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
      throw boom.notFound("Personal Administrativo no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.PersonalAdmin.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.PersonalAdmin.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const { usuario, persona, personalAdmin } = data;

    const newUsuario = await models.Usuario.create(usuario);
    const newPersona = await models.Persona.create(persona);

    const newPersonalAdmin = await models.PersonalAdmin.create({
      ...personalAdmin,
      usuarioId: newUsuario.id,
      personaId: newPersona.id,
    });
    return newPersonalAdmin;
  }

  async update(id, changes) {
    const { personalAdmin, usuario, persona } = changes;
    const personalBuscado = await models.PersonalAdmin.findOne({
      where: { id },
    });

    // Actualiza el registro de Usuario
    await models.Usuario.update(usuario, {
      where: { id: personalBuscado.usuarioId }, // Utiliza el ID del Usuario asociado al Doctor
    });

    // Actualiza el registro de Persona
    await models.Persona.update(persona, {
      where: { id: personalBuscado.personaId }, // Utiliza el ID de la Persona asociada al Doctor
    });

    // Actualiza el registro de Doctor
    const updatedPersonal = await models.PersonalAdmin.update(personalAdmin, {
      where: { id },
    });

    const [rowCount] = updatedPersonal; // Obtiene la cantidad de filas actualizadas
    if (rowCount === 0) {
      // Manejo de error: No se encontró el registro para actualizar
      throw new Error("No se encontró el registro para actualizar");
    }
    return updatedPersonal;
  }
  async delete(id) {
    const personal = await models.PersonalAdmin.findByPk(id);
    if (!personal) {
      throw new Error("No se encontró el registro del PersonalAdmin");
    }
    await models.PersonalAdmin.destroy({
      where: { id },
    });

    await models.Usuario.destroy({ where: { id: personal.usuarioId } });
    await models.Persona.destroy({ where: { id: personal.personaId } });
    return { id };
  }
  async deleteUsuario(id) {
    await models.PersonalAdmin.destroy({
      where: { usuarioId: id },
    });
    return { rta: true };
  }
  //crea un paciente
  async addPaciente(data) {
    const newPaciente = await models.P_creaPac.create(data);

    return newPaciente;
  }
}

module.exports = PersonalAdminService;
