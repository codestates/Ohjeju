const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
//필요한 모델 require 해와야 함

//플랜 관련 method
module.exports = {
  //plan쪽은 planner쪽이 선행되어야함
  addPlan: async (req, res) => {
    //* endpoint: https://ohjeju.link/plan?plannerId=''
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
    // try{
    //   //이거 planner을 쿼리로받던 바디로받던 받아야함 -> 대화후 api문서 수정
    //   const {departureTime,destination,memo,day} = req.body
    //   plan.create({
    //     departureTime,destination,memo,day,
    //     plannerId:req.query.plannerId //추후 body로 받을거면 코드수정 일단은 이렇게해놓음
    //   })
    //   .then(item => res.status(201).send('ok'))
    // }
    // catch(err){res.status(500).send('server error')}
  },

  modifyPlan: async (req, res) => {
    //* endpoint: https://ohjeju.link/plan?planId=''
    try{
      const targetPlan = await plan.findOne({ where: { id: req.query.planId } });
      if(!targetPlan) return res.status(404).send('can\'t find the plan');
      else {
        //여기도 마찬가지로 API 문서에는 memo, activityId, destination, departureTime으로 적혀있어요
        //코드는 신재님이 작성하신 코드 기반으로 작성했어요
        
        //patch는 받은 데이터만 업데이트하는 함수로 알고 있어서 바디로 받은 값만 업데이트하게끔 수정했어요
        for(const key in req.body) {
          targetPlan.update({
            [key] : req.body[key]
          })
        }
        
        return res.status(200).send(targetPlan);
      }
      // const findPlan = await plan.findOne({
      //   where:{id:req.query.planId}
      // })
      // if(findPlan === null) res.status(404).send("can't find the plan")
      // else{
      //   //일단 content가 다있어야하는데 추후 필수 content가 뭔지 얘기후에 코드 변경
      // const {departureTime,destination,memo,day} = req.body
      // plan.update({
      //   departureTime,destination,memo,day
      // },{
      //   where:{id:req.query.planId}
      // })
      // .then(item => {
      //   plan.findOne({
      //     where:{id:req.query.planId}
      //   })
      //     .then(item => res.status(200).json(item))
      //   })
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  deletePlan: async (req, res) => {
    //* endpoint: https://ohjeju.link/plan?planId=''
    try{
      const targetPlan = await plan.findOne({ where: { id: req.query.planId } });
      if(!targetPlan) return res.status(404).send('can\'t find the plan');
      else {
        targetPlan.destroy();

        return res.status(200).send('ok');
      }
      // const findPlan = await plan.findOne({
      //   where:{id:req.query.planId}
      // })
      // if(findPlan === null) res.status(404).send("can't find the plan")
      // else{
      //   plan.destroy({
      //     where:{id:req.query.planId}
      //   })
      //   .then(item => res.status(200).send('ok'))
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  }
}