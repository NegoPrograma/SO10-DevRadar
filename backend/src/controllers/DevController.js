const Dev = require("../models/Dev");
const axios = require('axios');
const parseStringAsArray = require("../utils/parseArrayAsString");
const { findConnections, sendMessage } = require('../websocket');
//geralmente o controller tem 5 métodos:
//index, show, store, update, delete
//lista os users, mostra 1, registra 1, atualiza 1 e deleta 1.
//afim de modularizar, se vc possui uma outra função de pesquisa, faça outro controller só pra ela.
module.exports = {

    async index(req,res){
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req,res){
        const {github_username, techs,latitude,longitude} = req.body;
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
        const devCheck = await Dev.findOne({github_username});
        if(!devCheck){
            //mais uma feature de desestruturação: caso a variavel apiResponse.data.name seja null, o valor é substituido por apiResponse.data.login.
            const { name = login, avatar_url, bio} = apiResponse.data;   
            console.log(name,avatar_url,bio, github_username);
            //tratando a entrada de listas de techs.
            
            const techList = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates:[longitude,latitude]
            };
        
            //abaixo, um JSON com Short-Syntax, isto é, a key tem o mesmo nome da variavel
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                location,
                techs: techList
            });
            //aplicando o real-time aos registros de novos usuários
            const sendSocketMessageTo = findConnections({latitude,longitude},techList);
            sendMessage(sendSocketMessageTo, 'new-dev!',dev);
            
            return res.json(dev);
        }
        return res.json(devCheck);
    },
    async update(req,res){
        const {techs,latitude,longitude,name,bio,avatar_url} = req.body;
            const techList = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates:[longitude,latitude]
            };
            const dev = await Dev.updateOne({github_username: req.params.dev},{
                name,
                avatar_url,
                bio,
                location,
                techs: techList
            });
        return res.json(dev);
    },
    async delete(req,res){
        const dev =  await Dev.deleteOne({github_username:req.params.dev});
        console.log(dev);
        return res.json(dev);
        

    }
}

//challenge: implementar as funções de update e destroy de usuários.