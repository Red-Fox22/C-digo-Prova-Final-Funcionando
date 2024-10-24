const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Tarefa = db.define('tarefa',{
    codTarefa:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    codUsuario:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        references:{
            model: 'usuarios',
            key: 'codUsuario'
        }
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    area:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridade:{
        type: DataTypes.ENUM('Alta', 'Media', 'Baixa'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status:{
        type: DataTypes.ENUM('A Fazer', 'Fazendo', 'Pronto'),
        defaultValue: 'A Fazer'
    }
},{
    timestamps: false,
    tableName: "tarefas"
})

module.exports = Tarefa