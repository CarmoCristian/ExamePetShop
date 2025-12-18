import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let listaInteressado = [];
let listaPet = [];
let listaAdotar = [];


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

function usuarioEstaAutenticado(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
       resposta.redirect('/login.html');
    }
}

function cadastrarInteressado(requisicao, resposta){
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;


    if (nome && email && telefone) 
    {
        listaInteressado.push({
            nome: nome,
            email: email,
            telefone: telefone,
        });
        resposta.redirect('/listarInteressado');
    }
    else
    {
        resposta.write(`
 <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Interessado</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container m-5">
        <h2>Cadastro de Interessado</h2>
        <form method="POST" action='/cadastrarInteressado' class="border p-3 needs-validation" novalidate>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" name="nome" value"${nome}" required>`);
        if (nome == ""){
            resposta.write(`
                        <div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o nome.
                        </div>
            `);
        }
        resposta.write(`</div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" name="email" value"${email}" required>`);
        if (email == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o email.
                            </div>`);
        }        
        resposta.write(`
   </div>
            <div class="mb-3">
                <label for="telefone" class="form-label">Telefone:</label>
                <input type="tel" class="form-control" id="telefone" name="telefone" value"${telefone}" required>
        `);            
        if (telefone == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o telefone.
                            </div>`);
        }       
        resposta.write(` </div>
            <button class="btn btn-primary" type="submit">Cadastrar Interessado</button>
            <a class="btn btn-secondary" href="/">Voltar</a>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</html>
`);
        resposta.end();
    }
}

function cadastrarPet(requisicao, resposta){
    const nome = requisicao.body.nome;
    const raca = requisicao.body.raca;
    const idade = requisicao.body.idade;


    if (nome && raca && idade) 
    {
        listaPet.push({
            nome: nome,
            raca: raca,
            idade: idade,
        });
        resposta.redirect('/listarPet');
    }
    else
    {
        resposta.write(`
 <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Pet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head><body>
    <div class="container m-5">
        <h2>Cadastro de Pet</h2>
        <form method="POST" action='/cadastrarPet' class="border p-3 needs-validation" novalidate>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>`);
        if (nome == ""){
            resposta.write(`
                        <div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o nome do Pet.
                        </div>
            `);
        }
        resposta.write(`</div>
            <div class="mb-3">
                <label for="raca" class="form-label">Raça:</label>
                <input type="text" class="form-control" id="raca" name="raca" value="${raca}" required>`);
        if (raca == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe a raça.
                            </div>`);
        }        
        resposta.write(`
       </div>
            <div class="mb-3">
                <label for="idade" class="form-label">Idade (em anos):</label>
                <input type="number" class="form-control" id="idade" name="idade" value="${idade}" required>
        `);            
        if (idade == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a idade.
                            </div>`);
        }       
        resposta.write(` </div>
            <button class="btn btn-primary" type="submit">Cadastrar Pet</button>
            <a class="btn btn-secondary" href="/">Voltar</a>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</html>
`);
        resposta.end();
    }

}

function adotarPet(requisicao, resposta){
    const interessado = requisicao.body.interessado;
    const pet = requisicao.body.pet;

    if (interessado && pet) 
    {
        listaAdotar.push({
            interessado: interessado,
            pet: pet,
        });
        resposta.redirect('/listarAdotar');
    }
    else
    {
        resposta.write(`
 <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adotar um Pet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container m-5">
        <h2>Adotar um Pet</h2>
        <form method="POST" action='/adotarPet' class="border p-3 needs-validation" novalidate>
            <div class="mb-3">
                <label for="interessado" class="form-label">Interessado:</label>
                <input class="form-select" id="interessado" name="interessado" value"${interessado}" required>`);

        if (interessado == ""){
            resposta.write(`
                        <div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o interessado para adoção.
                        </div>
            `);
        }
        resposta.write(`
            </div>
            <div class="mb-3">
                <label for="pet" class="form-label">Pet:</label>
                <input class="form-select" id="pet" name="pet" value"${pet}" required>`);

        if (pet == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o PET para ser adotado.
                            </div>`);
        }        

        resposta.write(`
            </div>
            <button class="btn btn-primary" type="submit">Registrar Adoção</button>
            <a class="btn btn-secondary" href="/">Voltar</a>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</html>
`);

    resposta.end();
    }
}

function autenticaUsuario(requisicao, resposta){
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == 'admin' && senha == '1234'){
        requisicao.session.usuarioAutenticado = true;
        resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(),{
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        resposta.redirect('/');
    }
    else{
        resposta.write('<!DOCTYPE html>');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Falha ao realizar login</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<p>Usuário ou senha inválidos!</p>');
        resposta.write('<a href="/login.html">Voltar</a>');
        if (requisicao.cookies.dataUltimoAcesso){
            resposta.write('<p>');
            resposta.write('Seu último acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
            resposta.write('</p>');
        }
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
}
app.post('/login',autenticaUsuario);

app.get('/login',(req,resp)=>{
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) =>{
    req.session.destroy();
    resp.redirect('/login.html');
});

app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(usuarioEstaAutenticado,express.static(path.join(process.cwd(), 'protegido')));

app.post('/cadastrarInteressado', usuarioEstaAutenticado, cadastrarInteressado);

app.post('/cadastrarPet', usuarioEstaAutenticado, cadastrarPet);

app.post('/adotarPet', usuarioEstaAutenticado, adotarPet);

app.get('/listarInteressado', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Interessados</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('</tr>');
    for (let i=0; i<listaInteressado.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaInteressado[i].nome}`);
        resp.write(`<td>${listaInteressado[i].email}`);
        resp.write(`<td>${listaInteressado[i].telefone}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('<br/>');

    if(req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.get('/listarPet', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Pets</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Raça</th>');
    resp.write('<th>Idade</th>');
    resp.write('</tr>');
    for (let i=0; i<listaPet.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaPet[i].nome}`);
        resp.write(`<td>${listaPet[i].raca}`);
        resp.write(`<td>${listaPet[i].idade}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('<br/>');

    if(req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.get('/listarAdotar', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Adoção</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Interessado</th>');
    resp.write('<th>Pet</th>');
    resp.write('</tr>');
    for (let i=0; i<listaAdotar.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaAdotar[i].interessado}`);
        resp.write(`<td>${listaAdotar[i].pet}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('<br/>');

    if(req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})