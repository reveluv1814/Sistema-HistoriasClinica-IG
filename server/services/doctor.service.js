const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");
const UserService = require("./usuario.service");
const { config } = require("../config/config");
const fs = require("fs");

class DoctorService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Doctor.findAndCountAll({
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
  async findCita() {
    const rta = await models.Doctor.findAndCountAll({
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
          ], // Especifica los atributos de persona que deseas mostrar
        },
      ],
      order: [
        ["id"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    return rta;
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
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const userService = new UserService();
      const { usuario, persona, doctor } = data;

      // Crear usuario
      const newUsuario = await userService.createUser(usuario, { transaction });

      // Crear persona
      const newPersona = await models.Persona.create(persona, { transaction });

      // Crear doctor asociado al usuario y persona creados
      await models.Doctor.create(
        {
          ...doctor,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        },
        { transaction }
      );

      // Confirmar la transacción
      await transaction.commit();

      return newPersona.id;
    } catch (error) {
      // Si ocurre algún error, deshacer la transacción
      if (transaction) {
        await transaction.rollback();
      }
      throw error; // Lanzar el error para manejarlo en un nivel superior
    }
  }

  async update(id, changes) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const { doctor, usuario, persona } = changes;

      const docBuscado = await models.Doctor.findOne({ where: { id } });
      if (!docBuscado) {
        throw new Error("No se encontró el registro del Doctor");
      }

      // Actualiza el registro de Usuario
      await models.Usuario.update(usuario, {
        where: { id: docBuscado.usuarioId },
        transaction,
      });

      // Actualiza el registro de Persona
      await models.Persona.update(persona, {
        where: { id: docBuscado.personaId },
        transaction,
      });

      // Actualiza el registro de Doctor
      const updatedDoctor = await models.Doctor.update(doctor, {
        where: { id },
        transaction,
      });

      const [rowCount] = updatedDoctor; // Obtiene la cantidad de filas actualizadas
      if (rowCount === 0) {
        // Manejo de error: No se encontró el registro para actualizar
        throw new Error("No se encontró el registro para actualizar");
      }
      await transaction.commit();

      /* const updatedRecord = await models.Doctor.findByPk(id); // Consulta el registro actualizado */
      return updatedDoctor;
    } catch (error) {
      // Si ocurre algún error, deshacer la transacción
      if (transaction) {
        await transaction.rollback();
      }
      throw error; // Lanzar el error para manejarlo en un nivel superior
    }
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
    const doctor = await models.Doctor.findByPk(id);
    if (!doctor) {
      throw new Error("No se encontró el registro del Doctor");
    }
    await models.Usuario.destroy({ where: { id: doctor.usuarioId } });
    return { id };
  }
  async fotoDoctor(id, req) {
    let datos = {};
    if (req) {
      datos.foto = config.urlImagenesBD + "doctores/" + req.filename;
    }
    await models.Persona.update(datos, {
      where: { id: id },
    });
    return datos.foto;
  }
  async actualizarFotoDoctor(id, file) {
    const docBuscado = await models.Doctor.findOne({ where: { id } });
    if (!docBuscado) {
      throw new Error("No se encontró el Doctor");
    }

    const personaBuscada = await models.Persona.findOne({
      where: { id: docBuscado.personaId },
    });
    if (!personaBuscada) {
      throw new Error("No se encontró la Persona asociada al Doctor");
    }

    const imagenEliminar = personaBuscada.foto;

    let datos = {};
    if (file) {
      datos.foto = config.urlImagenesBD + "doctores/" + file.filename;
    }

    await models.Persona.update(datos, {
      where: { id: docBuscado.personaId },
    });

    if (imagenEliminar !== "") {
      fs.unlinkSync(config.urlImagenesEliminarRuta + imagenEliminar);
    }

    return datos.foto;
  }
}

module.exports = DoctorService;
