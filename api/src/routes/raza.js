const { Router } = require("express");
const { addDogs } = require("../controllers/dogs");

const router = Router();

router.get("/");
router.get("");
router.get("/:idRaza");
router.post("/", addDogs);

module.exports = router;