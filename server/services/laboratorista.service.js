const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");
const UserService = require("./usuario.service");
const { config } = require("../config/config");
const fs = require("fs");

class LaboratoristaService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Laboratorista.findAndCountAll({
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
    const user = await models.Laboratorista.findByPk(id, {
      where: {
        usuarioId: {
          [Op.ne]: null,
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
        },
      ],
    });
    if (!user) {
      throw boom.notFound("Laboratorista no encontrado");
    }
    return user;
  }
  async findNombre(id) {
    const user = await models.Laboratorista.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: models.Persona,
          as: "persona",
          attributes: [
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
          ],
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
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const userService = new UserService();
      const { usuario, persona, laboratorista } = data;

      const newUsuario = await userService.createUser(usuario, { transaction });
      const newPersona = await models.Persona.create(persona, { transaction });

      await models.Laboratorista.create(
        {
          ...laboratorista,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
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
      const { laboratorista, usuario, persona } = changes;
      const laboBuscado = await models.Laboratorista.findOne({ where: { id } });
      if (!laboBuscado) {
        throw new Error("No se encontró el registro del Laboratorista");
      }

      // Actualiza el registro de Usuario
      await models.Usuario.update(usuario, {
        where: { id: laboBuscado.usuarioId },
        transaction,
      });

      // Actualiza el registro de Persona
      await models.Persona.update(persona, {
        where: { id: laboBuscado.personaId },
        transaction,
      });

      // Actualiza el registro de Doctor
      const updatedLaboratorista = await models.Laboratorista.update(
        laboratorista,
        {
          where: { id },
          transaction,
        }
      );

      const [rowCount] = updatedLaboratorista; // Obtiene la cantidad de filas actualizadas
      if (rowCount === 0) {
        // Manejo de error: No se encontró el registro para actualizar
        throw new Error("No se encontró el registro para actualizar");
      }
      await transaction.commit();
      /* const updatedRecord = await models.Doctor.findByPk(id); // Consulta el registro actualizado */
      return updatedLaboratorista;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
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
    const laboratorista = await models.Laboratorista.findByPk(id);
    if (!laboratorista) {
      throw new Error("No se encontró el registro del Doctor");
    }
    await models.Usuario.destroy({ where: { id: laboratorista.usuarioId } });
    return { id };
  }
  async fotoLaboratorista(id, req) {
    let datos = {};
    if (req) {
      datos.foto = config.urlImagenesBD + "laboratoristas/" + req.filename;
    }
    await models.Persona.update(datos, {
      where: { id: id },
    });
    return datos.foto;
  }
  async actualizarFotoLaboratorista(id, file) {
    const laboBuscado = await models.Laboratorista.findOne({ where: { id } });
    if (!laboBuscado) {
      throw new Error("No se encontró el Laboratorista");
    }

    const personaBuscada = await models.Persona.findOne({
      where: { id: laboBuscado.personaId },
    });
    if (!personaBuscada) {
      throw new Error("No se encontró la Persona asociada al Laboratorista");
    }

    const imagenEliminar = personaBuscada.foto;

    let datos = {};
    if (file) {
      datos.foto = config.urlImagenesBD + "laboratoristas/" + file.filename;
    }

    await models.Persona.update(datos, {
      where: { id: laboBuscado.personaId },
    });

    if (imagenEliminar !== "") {
      fs.unlinkSync(config.urlImagenesEliminarRuta + imagenEliminar);
    }

    return datos.foto;
  }
  //
  async createLaboratorio(data) {
    const userService = new UserService();
    const { usuario, persona, laboratorista } = data;

    const newUsuario = await userService.createUser(usuario);
    const newPersona = await models.Persona.create(persona);

    const newLaboratorista = await models.Laboratorista.create({
      ...laboratorista,
      usuarioId: newUsuario.id,
      personaId: newPersona.id,
    });
    return newLaboratorista;
  }
}

module.exports = LaboratoristaService;
