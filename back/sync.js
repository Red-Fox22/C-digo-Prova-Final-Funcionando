const { Usuario, Tarefa } = require('./model/associacao')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas Criadas e Banco de Dados Sincronizado')
    }catch(err){
        console.error('Erro ao Sincronizar Banco de Dados', err)
    }finally{
        await conn.close()
        console.log('Conexão com o Banco de Dados Finalizada')
    }
}
syncDataBase()