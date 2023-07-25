const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class LaboratoristaService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Laboratorista.findAndCountAll({
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
    const user = await models.Laboratorista.findByPk(id, {
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
      throw boom.notFound("Laboratorista no encontrado");
    }
    return user;
  }
  async findByUsuario(usuarioId) {
    const rta = await models.Laboratorista.findOne({
      //busca al primer usuario que cumpla con el where
      where: { usuarioId },
    });
    return rta;
  }
  async findByPersona(personaId) {
    const rta = await models.Laboratorista.findOne({
      //busca al primer usuario que cumpla con el where
      where: { personaId },
    });
    return rta;
  }
  async create(data) {
    const { usuario, persona, laboratorista } = data;

    const newUsuario = await models.Usuario.create(usuario);
    const newPersona = await models.Persona.create(persona);

    const newLaboratorista = await models.Laboratorista.create({
      ...laboratorista,
      usuarioId: newUsuario.id,
      personaId: newPersona.id,
    });
    return newLaboratorista;
  }

  async update(id, changes) {
    const { laboratorista, usuario, persona } = changes;
    const laboBuscado = await models.Laboratorista.findOne({ where: { id } });

    // Actualiza el registro de Usuario
    await models.Usuario.update(usuario, {
      where: { id: laboBuscado.usuarioId }, // Utiliza el ID del Usuario asociado al Doctor
    });

    // Actualiza el registro de Persona
    await models.Persona.update(persona, {
      where: { id: laboBuscado.personaId }, // Utiliza el ID de la Persona asociada al Doctor
    });

    // Actualiza el registro de Doctor
    const updatedLaboratorista = await models.Laboratorista.update(
      laboratorista,
      {
        where: { id },
      }
    );

    const [rowCount] = updatedLaboratorista; // Obtiene la cantidad de filas actualizadas
    if (rowCount === 0) {
      // Manejo de error: No se encontró el registro para actualizar
      throw new Error("No se encontró el registro para actualizar");
    }

    /* const updatedRecord = await models.Doctor.findByPk(id); // Consulta el registro actualizado */
    return updatedLaboratorista;
  }
  async delete(id) {
    const laboratorista = await models.Laboratorista.findByPk(id);
    if (!laboratorista) {
      throw new Error("No se encontró el registro del Doctor");
    }
    await models.Laboratorista.destroy({
      where: { id },
    });

    await models.Usuario.destroy({ where: { id: laboratorista.usuarioId } });
    await models.Persona.destroy({ where: { id: laboratorista.personaId } });
    return { id };
  }
  async deleteUsuario(id) {
    await models.Laboratorista.destroy({
      where: { usuarioId: id },
    });
    return { rta: true };
  }
}

module.exports = LaboratoristaService;
