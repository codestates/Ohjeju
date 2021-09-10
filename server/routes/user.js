const router = require('express').Router();

const {userController} = require('../controller');


//get /user/info?userId=''
router.get('/info',userController.get) 

//delete /user/info?userId=''
router.delete('/info',userController.delete)

//patch /user/info?userId=''
router.patch('/info',userController.patch)

module.exports = router;