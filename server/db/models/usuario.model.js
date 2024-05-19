const { Model, DataTypes, Sequelize } = require("sequelize");

const USUARIO_TABLE = "usuario";

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
  rol: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Usuario extends Model {
  static associate(models) {
    this.hasOne(models.Doctor, {
      as: "doctor",
      foreignKey: "usuarioId",
    });
    this.hasOne(models.PersonalAdmin, {
      as: "personalAdmin",
      foreignKey: "usuarioId",
    });
    this.hasOne(models.Laboratorista, {
      as: "laboratorista",
      foreignKey: "usuarioId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: "Usuario",
      timestamps: false,
    };
  }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario };
