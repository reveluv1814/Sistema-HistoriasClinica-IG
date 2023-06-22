const boom = require("@hapi/boom");
//hash
const bcrypt = require("bcrypt");

const { models } = require("./../libs/sequelize");
const { Persona } = require("../db/models/persona.model");
const { Doctor } = require("../db/models/doctor.model");
const { PersonalAdmin } = require("../db/models/personalAdmin.model");
const { Laboratorista } = require("../db/models/laboratorista.model");

//const { Op } = require("sequelize");

class UsuarioService {
  constructor() {}

  async create(data) {
    //hash - creamos un nuevo usuario aplicando hash a su password
    const hash = await bcrypt.hash(data.password, 10);
    //creamos segun el rol
    // Crear datos de la tabla correspondiente según rol
    const newUsuario = await models.Usuario.create({
      ...data,
      password: hash,
    });
    //eliminamos el password para que no se muestre y en sequelize eso se encuentra en dataValues
    delete newUsuario.dataValues.password;

    return newUsuario;
  }

  async find() {
    const rta = await models.Usuario.findAll({
      include: [
        {
          model: Doctor,
          as: "doctor",
          attributes: ["unidad"], // atributos que deseas seleccionar de la tabla usuario
          include: [
            {
              model: Persona,
              as: "persona",
              attributes: ["nombre", "apellidoPaterno", "apellidoMaterno"], // atributos que deseas seleccionar de la tabla persona
            },
          ],
        },
        {
          model: PersonalAdmin,
          as: "personalAdmin",
          attributes: ["cargo"], // atributos que deseas seleccionar de la tabla usuario
          include: [
            {
              model: Persona,
              as: "persona",
              attributes: ["nombre", "apellidoPaterno", "apellidoMaterno"], // atributos que deseas seleccionar de la tabla persona
            },
          ],
        },
        {
          model: Laboratorista,
          as: "laboratorista",
          attributes: ["especialidad"], // atributos que deseas seleccionar de la tabla usuario
          include: [
            {
              model: Persona,
              as: "persona",
              attributes: ["nombre", "apellidoPaterno", "apellidoMaterno"], // atributos que deseas seleccionar de la tabla persona
            },
          ],
        },
      ],
      /* where: { rol: { [Op.ne]: "admin" } }, */
      order: [
        ["createdAt", "DESC"], // ordenar por fecha de creación en orden ascendente
      ],
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.Usuario.findOne({
      //busca al primer usuario que cumpla con el where
      where: { email },
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Usuario.findByPk(id, {
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: [
            {
              model: Persona,
              as: "persona",
            },
          ],
        },
        {
          model: PersonalAdmin,
          as: "personalAdmin",
          include: [
            {
              model: Persona,
              as: "persona",
            },
          ],
        },
        {
          model: Laboratorista,
          as: "laboratorista",
          include: [
            {
              model: Persona,
              as: "persona",
            },
          ],
        },
      ],
    });
    if (!user) {
      throw boom.notFound("usuario no encontrado");
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsuarioService;
