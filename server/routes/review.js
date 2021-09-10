const router = require('express').Router();

const { reviewController } = require('../controller');

//GET /review?attractionId=''
router.get('/',reviewController.get);

module.exports = router;