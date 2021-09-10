const router = require('express').Router();

const { signUpController } = require('../controller');

//POST /signup
router.post('/',signUpController.post);

module.exports = router;