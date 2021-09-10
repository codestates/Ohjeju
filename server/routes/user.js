const router = require('express').Router();
const { getUserInfo, modifyUser, deleteUser } = require('../controller/UserController');

//유저 정보 관련 요청 라우팅
router.get('/info', getUserInfo);
router.patch('/info', modifyUser);
router.delete('/info', deleteUser);

module.exports = router;
