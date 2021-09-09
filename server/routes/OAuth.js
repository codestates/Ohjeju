const router = require('express').Router();
const { OAuthController } = require('../controller');


router.post('/kakao',OAuthController.kakao);
router.post('/google',OAuthController.google);


module.exports = router;