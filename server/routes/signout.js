const router = require('express').Router();

const { signOutController } = require('../controller');

//POST /signout
router.post('/',signOutController.post);

module.exports = router;