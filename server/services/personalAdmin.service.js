const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");
const UserService = require("./usuario.service");
const { config } = require("../config/config");
const fs = require("fs");

class PersonalAdminService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.PersonalAdmin.findAndCountAll({
      where: {
        usuarioId: {
          [Op.ne]: null,
        },
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
    const userService = new UserService();
    const { usuario, persona, personalAdmin } = data;

    const newUsuario = await userService.createUser(usuario);
    const newPersona = await models.Persona.create(persona);

    const newPersonalAdmin = await models.PersonalAdmin.create({
      ...personalAdmin,
      usuarioId: newUsuario.id,
      personaId: newPersona.id,
    });
    return newPersona.id;
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
    const personal = await models.PersonalAdmin.findByPk(id);
    if (!personal) {
      throw new Error("No se encontró el registro del PersonalAdmin");
    }
    await models.Usuario.destroy({ where: { id: personal.usuarioId } });
    return { id };
  }
  async fotoPersonal(id, req) {
    let datos = {};
    if (req) {
      datos.foto = config.urlImagenesBD + "personal/" + req.filename;
    }
    await models.Persona.update(datos, {
      where: { id: id },
    });
    return datos.foto;
  }
  async actualizarFotoPersonal(id, file) {
    const personalBuscado = await models.PersonalAdmin.findOne({
      where: { id },
    });
    if (!personalBuscado) {
      throw new Error("No se encontró el PersonalAdmin");
    }

    const personaBuscada = await models.Persona.findOne({
      where: { id: personalBuscado.personaId },
    });
    if (!personaBuscada) {
      throw new Error("No se encontró la Persona asociada al PersonalAdmin");
    }

    const imagenEliminar = personaBuscada.foto;

    let datos = {};
    if (file) {
      datos.foto = config.urlImagenesBD + "personal/" + file.filename;
    }

    await models.Persona.update(datos, {
      where: { id: personalBuscado.personaId },
    });

    if (imagenEliminar !== "") {
      fs.unlinkSync(config.urlImagenesEliminarRuta + imagenEliminar);
    }

    return datos.foto;
  }
}

module.exports = PersonalAdminService;
