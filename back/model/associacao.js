const Tarefa = require("./Tarefa")
const Usuario = require("./Usuario")

Usuario.hasMany(Tarefa, {
    foreignKey: 'codUsuario',
    as: 'tarefas',
    onDelete: 'CASCADE'
})
Tarefa.belongsTo(Usuario, {
    foreignKey: 'codUsuario',
    as: 'usuario',
    allowNull: false
})

module.exports = { Usuario, Tarefa }