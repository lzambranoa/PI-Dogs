const { Router } = require("express");
const { addDogs, getDogs } = require("../controllers/dogs");

const router = Router();

router.get("/", getDogs);
router.get("");
router.get("/:idRaza");
router.post("/", addDogs);

module.exports = router;