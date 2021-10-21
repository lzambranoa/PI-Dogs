const {Raza, Temperamento} = require('../db');
const { v4: uuidv4 }  = require('uuid');
const { DogsUrl } = require('../../constants');
const axios = require('axios'); 

function getDogs(req, res, next){

}

function addDogs(req, res, next){
    const {
       name,
       height,
       weight,
       image,
       life_span     
    } = req.body;

    let newDog = {
        id: uuidv4(),
        nombre: name,
        altura: height,
        peso: weight,
        imagen: image,
        tiempoVida: life_span
    }

    
    return Raza.create(newDog)
        .then((dog) => {
            res.send({...dog})
        })
        .catch((error) => next(error));
}

module.exports = {
    addDogs
}