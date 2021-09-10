const router = require('express').Router();
const { addPlan, modifyPlan, deletePlan } = require('../controller/PlanController');

router.post('/', addPlan);
router.patch('/', modifyPlan);
router.delete('/', deletePlan);
//router.get('/', getPlan) //API 작성되지 않음.
//getPlan은 논의되지 않은 부분이지만 추후 필요할지 몰라 주석으로 작성
//필요시 현재의 get planner요청에서 plan을 join해서 넘김

module.exports = router;