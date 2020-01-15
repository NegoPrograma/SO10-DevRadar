const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseArrayAsString");
module.exports = {
    async index(req,res){
        //buscar os devs num raio de 10km
        //filtro por techs.
        const{ latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs:{
                $in: techsArray,
                },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        });
        console.log(devs);
        
        return res.json(devs);
        
    }
}