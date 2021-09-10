const router = require('express').Router();

const {planController} = require('../controller');

//POST /plan
router.post('/',planController.post)

//get /plan?planId=''  추후필요하면 추가 현재: get planner시 plan을 join해서 넘김
router.get('/',planController.get) 

//delete /plan?planId=''
router.delete('/',planController.delete)

//patch /plan?planId=''
router.patch('/',planController.patch)

module.exports = router;