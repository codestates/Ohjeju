const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
//필요한 모델 require 해와야 함

//플랜 관련 method
module.exports = {
  //plan쪽은 planner쪽이 선행되어야함
  addPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?plannerId=''
    try {
      //API 문서에는 body 받는 내용 activityId, departureTime, memo, destination로 적혀있는데 확인 부탁드릴게요
      //코드는 신재님이 기존에 작성해주신 코드 기반으로 작성했어요
      const { departureTime, destination, memo, day } = req.body;
      await plan.create({
        plannerId: req.body.plannerId,
        departureTime, destination, memo, day
      })

      return res.status(201).send('ok')
    }
    catch(err) { return res.status(500).send('server error'); }
  },

  modifyPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''
    try{
      const targetPlan = await plan.findOne({ where: { id: req.query.planId } });
      if(!targetPlan) return res.status(404).send('can\'t find the plan');
      else {
        for(const key in req.body) {
          targetPlan.update({
            [key] : req.body[key]
          })
        }
        
        return res.status(200).send(targetPlan);
      }
    }
    catch(err) { console.log(err); res.status(500).send('server error') }
  },

  deletePlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''
    try{
      const targetPlan = await plan.findOne({ where: { id: req.query.planId } });
      if(!targetPlan) return res.status(404).send('can\'t find the plan');
      else {
        targetPlan.destroy();

        return res.status(200).send('ok');
      }
    }
    catch(err) { res.status(500).send('server error') }
  }
}