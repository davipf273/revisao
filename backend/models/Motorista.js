const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Motorista = db.define('motorista',{
    codMotorista:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cnh:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    tableName:'motoristas',
    timestamps: false
})

module.exports = Motorista