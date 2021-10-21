const { Router } = require('express');

const Dogs = require('./raza');
const Temperament = require('./temperamento');


const router = Router();

// Configurar los routers
router.use('/dogs', Dogs);
router.use('/temperament', Temperament);

router.get("/", (req, res) => {
    res.send("Alto! No te vayas sin adoptar tu perro favorito");
  });


module.exports = router;
