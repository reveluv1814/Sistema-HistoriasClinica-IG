const { Model, DataTypes, Sequelize } = require('sequelize');

const { USUARIO_TABLE } = require('./usuario.model')
const { PERSONA_TABLE } = require('./persona.model')

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
  especialidad: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  numeroMatricula:{
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
  },
  personaId:{
    field: 'persona_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PERSONA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Doctor extends Model {

  static associate(models) {
    this.belongsTo(models.Usuario, {as: 'usuario'});
    this.belongsTo(models.Persona, {as: 'persona'});
    //
    this.hasMany(models.Cita, {
      as: 'cita',
      foreignKey: 'doctorId',
    });
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