const { Model, DataTypes, Sequelize } = require('sequelize');

const { USUARIO_TABLE } = require('./usuario.model')

const DOCTOR_TABLE = 'doctor';

const DoctorSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  unidad: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  usuarioId: {
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USUARIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Doctor extends Model {

  static associate(models) {
    this.belongsTo(models.Usuario, {as: 'usuario'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCTOR_TABLE,
      modelName: 'Doctor',
      timestamps: false
    }
  }
}

module.exports = { Doctor, DoctorSchema, DOCTOR_TABLE };