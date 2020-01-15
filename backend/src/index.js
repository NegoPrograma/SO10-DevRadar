const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes.js');
const app = express();

//conectando com o banco usando o mongoose após pegar a string connection no próprio mongoDB Atlas.
mongoose.connect("mongodb+srv://admin-isaac:admin@cluster0-vyins.mongodb.net/SO10DB?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})


//aqui, estamos dizendo que o express será capaz de pegar informações
//do tipo JSON
app.use(express.json());
//a ordem aqui IMPORTA, express.json deve vir antes das rotas, para as rotas também conseguirem identificar responses em JSON
app.use(routes);


/*

Métodos de Requisição HTTP: GET, POST, PUT, DELETE

Tipos de parâmetros de requisições:

Query Params: req.query (FIltros, ordenação, paginação, etc)
Route Params: req.params, serve para identificar 
rotas de informações únicas, como user profile
Body: req.body, geralmente usado em métodos POST, ele costuma
deter informações a cerca de dados enviados por formulários

*/



app.listen(3333);
