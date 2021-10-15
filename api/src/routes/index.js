const { Router } = require('express');

const Dogs = require('./raza');
const Temperament = require('./temperamento');


const router = Router();

// Configurar los routers
router.use('/dogs', Dogs);
router.use('/temperament', Temperament);


module.exports = router;
