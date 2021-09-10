const router = require('express').Router();
const { createPlanner, getPlanner, modifyPlanner, deletePlanner } = require('../controller/PlannerController');

router.post('/', createPlanner);
router.get('/', getPlanner);
router.patch('/', modifyPlanner);
router.delete('/', deletePlanner);

module.exports = router;