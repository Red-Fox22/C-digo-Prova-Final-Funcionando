const express = require("express")
const app = express()
const cors = require("cors")
const conn = require("./db/conn")

const controllerUsuario = require("./controller/controllerUsuario")
const controllerTarefa = require("./controller/controllerTarefa")


const PORT = 3000
const hostname = 'localhost'

/*------------------------------------------------*/

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

/*------------------------------------------------*/

app.post('/usuario', controllerUsuario.cadastrarUsuario)
app.get('/usuarios', controllerUsuario.listarUsuario)

/*------------------------------------------------*/

app.post('/tarefa', controllerTarefa.cadastrarTarefa)
app.get('/tarefas', controllerTarefa.listarTarefa)

/*------------------------------------------------*/

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Aplicação rodando'})
})

/*------------------------------------------------*/

conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor Rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.error('Erro de conexão com o Banco de Dados', err)
})

