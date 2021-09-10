const router = require('express').Router();

const { signInController } = require('../controller');

//POST /signin
router.post('/',signInController.post);

module.exports = router;