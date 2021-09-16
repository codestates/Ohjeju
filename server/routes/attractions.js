const router = require("express").Router();
const { getAttraction , testAtt } = require("../controller/AttractionsController");

router.get("/", getAllAttraction);
router.post('/',getThatAttraction)
module.exports = router;
