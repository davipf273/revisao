const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    peso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    volume:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    codigoRastreio:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'motoristas',
            key:'codMotorista'
        }
    },
    
},{
    tableName:'cargas',
    timestamps: false
})

module.exports = Carga