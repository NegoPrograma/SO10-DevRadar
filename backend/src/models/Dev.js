const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//Schemas são a estruturação de uma entidade do seu banco.
const DevSchema = new mongoose.Schema({
name: String,
github_username: String,
bio: String,
avatar_url: String,
techs: [String],
location:{
    type: PointSchema,
    index: '2dsphere'
}
});

//o mongoose sempre vai requerer um model(é por ele que executamos o CRUD) baseado num Schema
//aqui a função mongoose.model, que tem 2 parametros definindo o nome do model e qual o schema é baseado
//ta retornando um valor do tipo Model, logo quem receber esse exports funciona como o Model.
module.exports = mongoose.model('Dev',DevSchema);