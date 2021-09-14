const router = require("express").Router();
const { getAttraction } = require("../controller/AttractionsController");

router.get("/", getAttraction);

module.exports = router;
