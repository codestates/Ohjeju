const router = require('express').Router();

const {groupController} = require('../controller');

//POST /group
router.post('/',groupController.post)

//get /group?groupId=''
router.get('/',groupController.get)

//delete /group?groupId=''
router.delete('/',groupController.delete)

//patch /group?groupId=''
router.patch('/',groupController.patch)

module.exports = router;