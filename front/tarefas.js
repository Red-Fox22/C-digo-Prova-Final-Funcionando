function excluirTarefa(codTarefa) {
    console.log('Excluido Tarefa')
    console.log(codTarefa)
    if (confirm('Tem Certeza que Tu queres Excluir?') === true){
        fetch(`http://localhost:3000/tarefa/${codTarefa}`, {
            method: 'DELETE'
        })
        .then(resposta => resposta.json())
        .then(dados =>{
            console.log(dados.message)
            if(dados.message){
                carregarTarefas()
            }
        })
        .catch((err)=>{
            console.error('Não foi Possível Excluir a Tarefa', err)
        })
    }
}

function gerarBotao(status) {
    if (status === "A Fazer") {
        return `
         <button data-status="Fazendo">Fazendo</button>
         <button data-status="Pronto">Pronto</button>`
    } else if (status === "Fazendo") {
        return `
        <button data-status="A Fazer">A Fazer</button>
        <button data-status="Pronto">Pronto</button>`
    } else if (status === "Pronto") {
        return `
        <button data-status="A Fazer">A Fazer</button>
        <button data-status="Fazendo">Fazendo</button>`
    }
}

function criarCard(tarefa) {
    const cartao = document.createElement('div')
    cartao.className = 'card'
    cartao.dataset.id = tarefa.codTarefa
    cartao.innerHTML = `                    
    <p><strong>Tipo: </strong> ${tarefa.tipo}</p>
    <p><strong>Area: </strong> ${tarefa.area}</p>
    <p><strong>Prioridade: </strong> ${tarefa.prioridade}</p>
    <p><strong>Usuário: </strong>${tarefa.usuario.nome}</p>
    <div class="btn">
        <button id="editar">Editar</button>
        <button id="excluir">Excluir</button>
    </div>
    <p><strong>Status</strong></p>
    <div class="btn">
        ${gerarBotao(tarefa.status)}
    </div>
    `
    const excluir = cartao.querySelector('#excluir')
    //console.log(excluir)
    excluir.addEventListener("click", () => {
        excluirTarefa(tarefa.codTarefa)
    })

    const editar = cartao.querySelector('#editar')
    //console.log(editar)
    editar.addEventListener("click", () => {
        editarTarefa()
    })
    const btnStatus = cartao.querySelectorAll('button[data-status]')
    //console.log(btnStatus)
    btnStatus.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            const novoStatus = btn.getAttribute('data-status')
            //console.log(novoStatus)
            atualizarStatus(novoStatus, tarefa.codTarefa)
        })
    })


    return cartao
}

function editarTarefa(){
    console.log('Editando Tarefa')
}

function atualizarStatus(status, codTarefa){
    console.log(status, codTarefa)
    const valores = {
        status: status,
        codTarefa: codTarefa
    }
    fetch('http://localhost:3000/tarefa', {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(resposta => resposta.json())
    .then(dados =>{
        console.log(dados)
        if(dados.message){
            carregarTarefas()
        }
    })
    .catch((err)=>{
        console.error("Não foi possível Atualizar o Status", err)
    })
}


function excluirTarefa(codTarefa){
    const apaga = confirm('Deseja apagar a tarefa?')
    if(apaga){
        fetch(`http://localhost:3000/tarefa/${codTarefa}`, {
            method: 'DELETE'
        })
        .then(resposta => resposta.json())
        .then(dados =>{
            console.log(dados)
            if(dados.message){
                carregarTarefas()
            }
        })
        .catch((err)=>{
            console.error('Erro ao Excluir os Dados', err)
        })
    }
}


function carregarTarefas() {

document.getElementById('a-fazer').innerHTML = ''
document.getElementById('fazendo').innerHTML = ''
document.getElementById('pronto').innerHTML = ''

    fetch('http://localhost:3000/tarefas')
        .then(resposta => resposta.json())
        .then(tarefas => {
            console.log(tarefas)
            tarefas.forEach(tarefa => {
                const card = criarCard(tarefa)
                const coluna = document.getElementById(`${tarefa.status.toLowerCase().replace(' ', '-')}`)

                if (coluna) {
                    coluna.appendChild(card)
                }
            })
        }).catch((err) => {
            console.error('Erro ao listar tarefas', err)
        })

}

window.onload = carregarTarefas;