const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario',{
    codUsuario:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    createdAt:false,
    updatedAt: false,
    tableName: "usuarios"
})

module.exports = Usuario