const boom = require("@hapi/boom");
//hash
const bcrypt = require("bcrypt");

const { models } = require("./../libs/sequelize");

class UsuarioService {
  constructor() {}

  async create(data) {
    //hash - creamos un nuevo usuario aplicando hash a su password
    const hash = await bcrypt.hash(data.password, 10);

    //creamos segun el rol
    // Crear datos de la tabla correspondiente según rol

    let newUsuario;
    switch (data.rol) {
      case "doctor":
        newUsuario = await models.Usuario.create(
          {
            ...data,
            password: hash,
          },
          { include: "doctor" }
        );
        break;
      case "personal":
        newUsuario = await models.Usuario.create(
          {
            ...data,
            password: hash,
          },
          { include: "personal" }
        );
        break;
      case "laboratorista":
        newUsuario = await models.Usuario.create(
          {
            ...data,
            password: hash,
          },
          { include: "laboratorista" }
        );
        break;
      default:
        throw new Error(`El rol '${data.rol}' no es válido`);
    }

    //eliminamos el password para que no se muestre y en sequelize eso se encuentra en dataValues
    delete newUsuario.dataValues.password;

    return newUsuario;
  }

  async find() {
    const rta = await models.Usuario.findAll({
      include: ["doctor"],
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
    const user = await models.Usuario.findByPk(id);
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
