//boom
const boom = require("@hapi/boom");
//
//bcrypt
const bcrypt = require("bcrypt");
//
//jwt
const jwt = require("jsonwebtoken");
//
//nodemailer
const nodemailer = require("nodemailer");
//
//modelos de la bd
const { models } = require("./../libs/sequelize");

//el secret
const { config } = require("./../config/config");
//
//servicio de los usuarios
const UsuarioService = require("./usuario.service");
const service = new UsuarioService();
//

class AuthService {
  //comparar datos
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized("Email no encontrado"); //si no existe el email sale error

    const isMatch = await bcrypt.compare(password, user.password); //compara password y el hash

    if (!isMatch) throw boom.unauthorized("Contraseña incorrecta"); //si es falso  sale un error

    delete user.dataValues.password; //elimina el password para que no se vea

    // Verificar si el rol del usuario es "admin"
    if (user.dataValues.rol === "admin") {
      // Si es admin, devolver solo el usuario
      return user;
    }

    // Si no es admin, obtener el idRol usando la función findRolUser
    const idRol = await this.findRolUser(
      user.dataValues.id,
      user.dataValues.rol
    );
    // Devolver un objeto que contiene tanto el usuario como el idRol
    user.dataValues.idRol = idRol;
    return user;
  }
  //firamdo del token osea encripta los datos
  signToken(user) {
    //payload el cuerpo del token
    const payload = {
      sub: user.id,
      rol: user.rol,
    };

    const token = jwt.sign(payload, config.jwtSecret); //el secret se guarda como una variable de ambiente

    return { user, token }; //envio el usuario ya verificado por passport  y el token generado
  }

  async sendRecovery(email) {
    //verificamos si existe el usuario
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized(); //si no existe el email sale error
    //verifiacamos que no tenga un recoveryToken en la bd
    jwt.verify(user.recoveryToken, config.jwtSecret, (err) => {
      if (!err) throw boom.badRequest("You already have a active token.");
    });
    /**********generamos token para enviar link de recuperación  */

    const payload = { sub: user.id }; //generamos el payload del token
    const token = jwt.sign(payload, config.jwtSecretMail, {
      expiresIn: "15min",
    }); //generamos el token
    const link =
      config.urlFrontService + `/recovery/change-password?token=${token}`;
    //guardamos el token en la base de datos por seguridad
    await service.update(user.id, { recoveryToken: token });

    /*******fin del proceso de envio del token */

    //correo
    const mail = {
      //enviamos el correo
      from: config.emailSender, // sender address/de quien
      to: `${user.email}`, // list of receivers/ para quien
      subject:
        "Recuperación de Contrasaña Sistema de Administracion de Historias Clínicas", // Subject line / titulo del correo
      text: "Enlace de Recuperación", // plain text body / text del correo
      html: `
      <h1 style="text-align:center; ">Enlace de Recuperación</h1>
      <div style="display: flex;justify-content: center;align-items: center;flex-direction: row;"> 
          <img src="https://www.umsa.bo/image/journal/article?img_id=3993637&t=1632166043920" style="width:20%"> </br>
          <h2>Ingresa al siguiente enlace para recuperar tu Contraseña:</h2></br>
          <p style="font-weight: 700; "> ${link} </p>
      </div>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  //envia mail si se olvidó la contraseña
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", //servidor de correo
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.emailSender, //''
        pass: config.emailPassword, //'',
      },
    });
    await transporter.sendMail(infoMail);
    return { message: "mail sent" };
  }

  //funcion que recibe la nueva contraseña del fron junto con el token para cambiarlo
  async changePassword(token, newPassword) {
    let user;
    try {
      //inico verifica
      const payload = jwt.verify(token, config.jwtSecretMail);
      user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) throw boom.unauthorized();
      if (user.recoveryToken === null) throw boom.unauthorized();
      //fin verifica
      const hash = await bcrypt.hash(newPassword, 10); //hashea la nueva contraseña
      await service.update(user.id, { recoveryToken: null, password: hash }); //actualiza
      return { message: "password changed" };
    } catch (error) {
      setTimeout(async () => {
        await service.update(user.id, { recoveryToken: null });
      }, 5 * 60 * 1000); // 15 minutos en milisegundos
      throw boom.unauthorized();
    }
  }
  //funcion para devolver el id del rol
  async findRolUser(id, rol) {
    let roleModel;
    // Verificar el rol especificado y seleccionar el modelo de rol apropiado
    switch (rol) {
      case "doctor":
        roleModel = models.Doctor;
        break;
      case "personalAdmin":
        roleModel = models.PersonalAdmin;
        break;
      case "laboratorista":
        roleModel = models.Laboratorista;
        break;
      default:
        throw new Error(`Rol no válido: ${rol}`);
    }
    // Buscar el rol específico basado en el id de usuario
    const role = await roleModel.findOne({
      where: {
        usuarioId: id,
      },
    });
    if (!role) {
      throw boom.notFound(
        `No se encontró un rol de ${rol} para el usuario con ID ${id}`
      );
    }
    return role.id;
  }
}

module.exports = AuthService;
