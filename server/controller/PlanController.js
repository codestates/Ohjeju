const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
//필요한 모델 require 해와야 함

//플랜 관련 method
module.exports = {
  //plan쪽은 planner쪽이 선행되어야함
  addPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan
    try{
      //이거 planner을 쿼리로받던 바디로받던 받아야함 -> 대화후 api문서 수정
      const {departureTime,destination,memo,day} = req.body
      plan.create({
        departureTime,destination,memo,day,
        plannerId:req.query.plannerId //추후 body로 받을거면 코드수정 일단은 이렇게해놓음
      })
      .then(item => res.status(200).send('ok'))
    }
    catch(err){res.status(500).send('server error')}
  },

  modifyPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''
    try{
      const findPlan = await plan.findOne({
        where:{id:req.query.planId}
      })
      if(findPlan === null) res.status(404).send("can't find the plan")
      else{
        //일단 content가 다있어야하는데 추후 필수 content가 뭔지 얘기후에 코드 변경
        const {departureTime,destination,memo,day} = req.body
        plan.update({
          departureTime,destination,memo,day
        },{
          where:{id:req.query.planId}
        })
        .then(item => {
          plan.findOne({
            where:{id:req.query.planId}
          })
          .then(item => res.status(200).json(item))
        })
      }
    }
    catch(err) {res.status(500).send('server error')}
  },

  deletePlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''
    try{
      const findPlan = await plan.findOne({
        where:{id:req.query.planId}
      })
      if(findPlan === null) res.status(404).send("can't find the plan")
      else{
        plan.destroy({
          where:{id:req.query.planId}
        })
        .then(item => res.status(200).send('ok'))
      }
    }
    catch(err){res.status(500).send('server error')}
  }
}