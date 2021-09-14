const router = require("express").Router();
const { getAttraction } = require("../controller/AttractionsController");

router.post("/", getAttraction);

module.exports = router;
