let res = document.getElementById('res')
let cadastrarUsuario = document.getElementById('cadastrarUsuario')

cadastrarUsuario.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value

    const dados = {
        nome: nome,
        email: email
    }

    fetch('http://localhost:3000/usuario', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resposta => resposta.json())
    .then(dados =>{
        console.log(dados)
        res.innerHTML = ''
        res.innerHTML += dados.message
        res.style.marginLeft = '30px'
    })
    .catch((err)=>{
        console.error("Não foi possível cadastrar o Usuário", err)
    })
})