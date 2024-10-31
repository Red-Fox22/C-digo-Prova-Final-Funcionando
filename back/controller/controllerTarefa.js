const { Tarefa, Usuario } = require('../model/associacao')

const cadastrarTarefa = async (req, res) => {
    const valores = req.body
    console.log(valores)
    try {
        const pesq = Tarefa.create(valores, { raw: true })
        res.status(201).json({ message: "Cadastro Concluído com Sucesso" })
    } catch (err) {
        console.error('Erro ao cadastrar a tarefa', err)
        res.status(500).json({ message: 'Erro ao cadastrar a tarefa' })
    }
}
const listarTarefa = async (req, res) => {
    try {
        const pesq = await Tarefa.findAll({
            include: {
                model: Usuario,
                as: 'usuario'
            }
        })

        res.status(200).json(pesq)

    } catch (err) {
        res.status(500).json({ message: 'Erro na listagem das Tarefas' })
    }
}

const apagarTarefa = async (req, res) => {
    const valor = req.params
    console.log(valor)
    try {
        const pesq = Tarefa.destroy({where:{ codTarefa: valor.id} })
        res.status(200).json({ message: "Tarefa Excluida" })
    } catch (err) {
        console.error('Erro ao Excluir tarefas', err)
        res.status(500).json({ message: "Erro ao Excluir tarefas" })
    }
}

const atualizarStatus = async(req, res)=>{
    const valores = req.body
    console.log(valores)
    try{
        const pesq = await Tarefa.update({status: valores.status}, {where: {codTarefa: valores.codTarefa}})
        res.status(200).json({message: "Dados atualizados com sucesso!"})
    }catch(err){
        console.error('Erro ao atualizar o status da tarefa', err)
        res.status(500).json({message: "Erro ao atualizar o status da tarefa"})
    }
}

module.exports = { cadastrarTarefa, listarTarefa, apagarTarefa, atualizarStatus }