const { Tarefa,Usuario } = require('../model/associacao')

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
            const post = await Tarefa.findAll({
                include: {
                    model: Usuario,
                    as: 'usuario'
                }
            })
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json({ message: 'Erro na listagem das Tarefas' })
        }
    }

module.exports = { cadastrarTarefa, listarTarefa }