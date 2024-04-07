const boom = require("@hapi/boom");
const { Op, Sequelize } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");
const UserService = require("./usuario.service");
const { config } = require("../config/config");

class AdminService {
  constructor() {}

  async find(req) {
    const q = req.query.q;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const rta = await models.Usuario.findAndCountAll({
      where: {
        email: {
          [Op.iLike]: `%${q}%`,
          [Op.not]: 'neilgraneros11@gmail.com'
        },
        rol: "admin",
      },
      attributes: ["id", "email", "rol", "createdAt"],
      offset: offset,
      include: [
        {
          model: models.Doctor,
          as: "doctor",
          attributes: ["id"],
          include: [
            {
              model: models.Persona,
              as: "persona",
            },
          ],
        },
      ],
      limit: limit,
      order: [
        ["id", "ASC"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Usuario.findByPk(id, {
      attributes: ["id", "email", "rol", "createdAt"],
      include: [
        {
          model: models.Doctor,
          as: "doctor",
          include: [
            {
              model: models.Persona,
              as: "persona",
            },
          ],
        },
        {
          model: models.Laboratorista,
          as: "laboratorista",
        },
        {
          model: models.PersonalAdmin,
          as: "personalAdmin",
        },
      ],
    });
    if (!user) {
      throw boom.notFound("Admin no encontrado");
    }

    return user;
  }

  async create(data) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const userService = new UserService();
      const { usuario, persona, doctor, laboratorista, personalAdmin } = data;

      // Crear usuario
      const newUsuario = await userService.createUser(usuario, { transaction });

      // Crear persona
      const newPersona = await models.Persona.create(persona, { transaction });

      // Crear doctor
      await models.Doctor.create(
        {
          ...doctor,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        },
        { transaction }
      );
      // Crear laboratorista
      await models.Laboratorista.create(
        {
          ...laboratorista,
          usuarioId: newUsuario.id,
          personaId: newPersona.id,
        },
        { transaction }
      );
      //crea personal admin
      await models.PersonalAdmin.create(
        {
          ...personalAdmin,
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
      const { usuario, persona, doctor, laboratorista, personalAdmin } =
        changes;

      ///Busca el user
      const userBuscado = await models.Usuario.findOne({ where: { id } });
      if (!userBuscado) {
        throw new Error("No se encontró el registro del Usuario");
      }
      //busca ppor roles
      const docBuscado = await models.Doctor.findOne({
        where: { usuarioId: userBuscado.id },
      });
      if (!docBuscado) {
        throw new Error("No se encontró el registro del Doctor");
      }

      const personalBuscado = await models.PersonalAdmin.findOne({
        where: { usuarioId: userBuscado.id },
      });
      if (!personalBuscado) {
        throw new Error("No se encontró el registro del Personal Admin");
      }

      const laboBuscado = await models.Laboratorista.findOne({
        where: { usuarioId: userBuscado.id },
      });
      if (!laboBuscado) {
        throw new Error("No se encontró el registro del Laboratorista");
      }

      //busca la persona

      // Actualiza el registro de Usuario
      const userUpdate = await models.Usuario.update(usuario, {
        where: { id: docBuscado.usuarioId },
        transaction,
      });

      // Actualiza el registro de Persona
      const personaUpdate = await models.Persona.update(persona, {
        where: { id: docBuscado.personaId },
        transaction,
      });

      // Actualiza el registro de Doctor
      const updatedDoctor = await models.Doctor.update(doctor, {
        where: { id: docBuscado.id },
        transaction,
      });

      const updatedPersonal = await models.PersonalAdmin.update(personalAdmin, {
        where: { id: personalBuscado.id },
        transaction,
      });
      const updatedLaboratorista = await models.Laboratorista.update(
        laboratorista,
        {
          where: { id: laboBuscado.id },
          transaction,
        }
      );

      const [rowCount1] = updatedDoctor; // Obtiene la cantidad de filas actualizadas
      const [rowCount2] = updatedLaboratorista;
      const [rowCount3] = updatedPersonal;
      if (rowCount1 === 0 && rowCount2 === 0 && rowCount3 === 0) {
        // Manejo de error: No se encontró el registro para actualizar
        throw new Error("No se encontró el registro para actualizar");
      }
      await transaction.commit();

      /* const updatedRecord = await models.Doctor.findByPk(id); // Consulta el registro actualizado */
      return {
        userUpdate,
        personaUpdate,
        updatedDoctor,
        updatedPersonal,
        updatedLaboratorista,
      };
    } catch (error) {
      // Si ocurre algún error, deshacer la transacción
      if (transaction) {
        await transaction.rollback();
      }
      throw error; // Lanzar el error para manejarlo en un nivel superior
    }
  }

  async findRol(id) {
    const user = await models.Usuario.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: models.Doctor,
          as: "doctor",
          attributes: ["id"],
        },
        {
          model: models.Laboratorista,
          as: "laboratorista",
          attributes: ["id"],
        },
        {
          model: models.PersonalAdmin,
          as: "personalAdmin",
          attributes: ["id"],
        },
      ],
    });
    if (!user) {
      throw boom.notFound("Admin no encontrado");
    }

    return user;
  }
}

module.exports = AdminService;
