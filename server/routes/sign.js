const router = require('express').Router();
const { signIn, signUp, signOut } = require('../controller/SignController');
const { OAuthKakao, OAuthGoogle } = require('../controller/OAuthController');

//유저 로그인 관련 요청 라우팅
router.post('/signin', signIn);
router.post('/signUp', signUp);
router.post('/signOut', signOut);

//OAuth 요청도 로그인 관련 요청으로 판단해서 함께 분류했습니다
router.post('/kakao', OAuthKakao);
router.post('/google', OAuthGoogle);

module.exports = router;