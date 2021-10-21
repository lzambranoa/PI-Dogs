const {Raza, Temperamento} = require('../db');
const { v4: uuidv4 }  = require('uuid');
const { DogsUrl } = require('../../constants');
const axios = require('axios'); 


const addDogs = (req, res, next) => {

    const {name, height, weight, image, life_span, temperamento} = req.body;

    let newDog = {
        id: uuidv4(),
        name: name,
        height: height,
        weight: weight,
        image: image,
        life_span,
    }

    Raza.create(newDog)
        .then((raza) => {
            raza.addTemperamento(temperamento);
            res.send({...newDog, temperamento})
        })
        .catch((error) => next(error))
}

module.exports = {
    addDogs
}