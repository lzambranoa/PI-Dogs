require('dotenv').config();
const { Temperamento } = require('../db');
const { DogsUrl } = require('../../constants');
const axios = require('axios').default;
const {
    YOUR_API_KEY
} = process.env;


async function preCarga() {
    try {
        let temperament = (await axios.get(`${DogsUrl}/?api_key=${YOUR_API_KEY}`)).data
        temperament = temperament.map(e => {
            return {
                name: e.temperament
            }
        })
        temperament = await Promise.all(temperament.map(e => Temperamento.findOrCreate({ where: e }))),
            console.log("carga Exitosa")
        return "Carga Exitosa"

    } catch (error) {
        console.log(error)
    }
}

const getTemperamento = async(req, res, next) => {
    try {
        let temperament = await Temperamento.findAll()
        res.send(temperament)
    } catch (error) {
        next(error)
    }
}





module.exports = {
    preCarga,
    getTemperamento
}