let res = document.getElementById('res')
let cadastrarTarefa = document.getElementById('cadastrar')
let nomeSelect = document.getElementById('nome')


cadastrarTarefa.addEventListener('click', (e) => {
    e.preventDefault()
    const codUsuario = document.getElementById('nome').value
    const tipo = document.getElementById('tipo').value
    const area = document.getElementById('area').value
    let prioridade = document.getElementById('prioridade').value
    
    const valores = {
        codUsuario: codUsuario,
        tipo: tipo,
        area: area,
        prioridade: prioridade,
    }

    console.log(valores)

    fetch('http://localhost:3000/tarefa', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(resposta => resposta.json())
    .then(tarefas =>{
        console.log(tarefas)
        // res.innerHTML = ''
        // res.innerHTML += dados.message
        // res.style.marginLeft = '30px'
    })
    .catch((err)=>{
        console.error("Não foi possível cadastrar o Usuário", err)
    })

})

function carregarUsuarios() {
    fetch('http://localhost:3000/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            console.log(usuarios)

            usuarios.forEach(usuario => {
                const option = document.createElement('option')
                option.value = usuario.codUsuario
                option.textContent = usuario.nome
                nomeSelect.appendChild(option)
            })
        }).catch((err) => {
            console.error('Erro ao listar tarefas', err)
        })

}

window.onload = carregarUsuarios