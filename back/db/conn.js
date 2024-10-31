const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('teste', 'root', 'senai', {
    host: "localhost",
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Banco de Dados Conectado com Sucesso')
}).catch((err)=>{
    console.error('Erro ao Conectar Banco de Dados', err)
})

module.exports = sequelize