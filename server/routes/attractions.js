const router = require("express").Router();
const { getAllAttraction , getThatAttraction } = require("../controller/AttractionsController");

router.get("/", getAllAttraction);
router.post('/',getThatAttraction)
module.exports = router;
