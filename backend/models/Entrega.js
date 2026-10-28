const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    cidadeDestino:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    statusAtual:{
        type: DataTypes.ENUM('ENTREGUE', 'TRANSITO'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.DATE,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'cargas',
            key:'codCarga'
        }
    },
    
},{
    tableName:'entregas',
    timestamps: false
})

module.exports = Entrega