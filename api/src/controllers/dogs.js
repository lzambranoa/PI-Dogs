require('dotenv').config();
const { Raza, Temperamento } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { DogsUrl } = require('../../constants');
const axios = require('axios').default;
const {
    YOUR_API_KEY
} = process.env;


const addDogs = async (req, res, next) => {

    const { name, height, weight, image, life_span, temperamento } = req.body;

    let newDog = {
        id: uuidv4(),
        name: name,
        height: height,
        weight: weight,
        image: image,
        life_span,
    }

    await Raza.create(newDog)
        .then((raza) => {
            raza.addTemperamento(temperamento);
            res.send({ ...newDog, temperamento })
        })
        .catch((error) => next(error))
}

const getDogs = async (req, res, next) => {
    if (req.query.name) {
        return next();
    }

    try {
        let dbDogs = await Raza.findAll({ include: Temperamento });
        dbDogs = dbDogs.map((e) => {
            return {
                id: e.dataValues.id,
                name: e.dataValues.name,
                height: e.dataValues.height,
                weight: e.dataValues.weight,
                life_span: e.dataValues.life_span,
                temperament: e.dataValues.temperament
            };
        });

        await axios.get(`${DogsUrl}/?api_key=${YOUR_API_KEY}`)
            .then((response) => {
                let apiDogs = response.data;
                let dogArray = apiDogs.map(data => {
                    return {
                        id: data.id,
                        name: data.name,
                        weight: data.weight.metric,
                        height: data.weight.metric,
                        life_span: data.life_span,
                        temperament: data.temperament,
                        image: data.image.url
                    }
                })

                dogArray = dogArray.concat(dbDogs);
                res.send(dogArray);
            })
            .catch((error) => {
                console.log(error)
            })


    } catch (error) {
        next(error);
    }
}

module.exports = {
    addDogs,
    getDogs
}