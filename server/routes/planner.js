const router = require('express').Router();

const {plannerController} = require('../controller');

//POST /planner
router.post('/',plannerController.post)

//get /planner?plannerId=''
router.get('/',plannerController.get) 

//delete /planner?plannerId=''
router.delete('/',plannerController.delete)

//patch /planner?plannerId=''
router.patch('/',plannerController.patch)

module.exports = router;