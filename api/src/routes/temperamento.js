const { Router } = require("express");
const { getTemperamento } = require("../controllers/temperament");

const router = Router();

router.get("/", getTemperamento);

module.exports = router;