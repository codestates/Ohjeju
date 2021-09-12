const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
//필요한 모델 require 해와야 함
const axios = require('axios')
//플래너 관련 method
module.exports = {
  createPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner
    try{
      if(req.body.name.length === 0){ //빈칸인지 undefined지는 알아서
        res.status(400).send("content is empty")
      }
      else{
        if(req.body.groupId){// 그룹이 생성 되고 플래너 생성할때
          planner.create({
            name:req.body.name,
            groupId:req.body.groupId
          }).then(item => res.status(201).send('ok'))
        }
        else{ //플래너 생성 하고 그룹생성할때 -> 이거 어떻게할건지 얘기해봐야됨 순서를 강제할건지
          //정해지면 추후작성
        }
      }
    }
    catch(err){res.status(500).send('server error')}
  },
  
  getPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''
    const findPlanner = await planner.findOne({
      where:{id:req.query.plannerId},
      include:[{model:group}]
    })
    const userGroup = await user_group.findAll({
      where:{groupId:findPlanner.group.id},
      include:[{model:users},{model:group}]
    }) //얘는이상하게 axios해서 받아올려하면 오류남 그래서 그냥 sequelize함수로
    const userInGroup = userGroup.map(item => item.user.userName)
    const findPlan = await plan.findAll({
      where:{plannerId:req.query.plannerId}
    })
    const customPlan = () => {
      /* 
      plan부분 get이 따로 작성한게없고 planner 불러올때 Plan을 불러오기로햇는데
      api문서대로 불러오게하면 너무 지저분하고 복잡함 plan이 시간대별 일자별로 여러개인데 결과가
      plan:[{day:1,depart:9시 ..},{day:2,depart:9시 ..}] ...이런식으로 플래너에 일차가 많고 일차당 plan이많을수록 지저분함
      일단은 틀은
      plan:{
        day1:[], 이런식으로나옴 근데 출발시간별 오름차순 이런건 고민좀해봐야할듯
        dat2:[] -> 안에 day는 중복되는느낌인데 그냥 일단 넣음
        ..일차 늘어나면 객체key도 늘어남
      }
      구상하느라 시간좀썻긴한데 더 불편하면 바까도됨 ㅎ;ㅋ;
      */

      const resultPlan = {}
      findPlan.forEach(item => {
        const {id,departureTime,destination,memo,day} = item
        const VAR = `day${item.day}`
        if(!resultPlan[VAR]){
          resultPlan[VAR] =[];
          resultPlan[VAR].push({
            id,departureTime,destination,memo,day
          })
        }
        else{
          resultPlan[VAR].push({
            id,departureTime,destination,memo,day
          })
        }
      })
      return resultPlan
    }
    if(findPlanner === null) res.status(404).send("can't find the planner")
    else{
      const resultPlan = customPlan();
      res.json({
        plan:resultPlan,
        group:{
          groupId:findPlanner.group.id,
          userName:userInGroup
        },
        name:findPlanner.name
      })
    }
  },

  modifyPlanner: async (req, res) => {
    //planner이름만 바뀌고 위에 getplanner
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''
    try{
      const findPlanner = await planner.findOne({
        where:{id:req.query.plannerId},
      })
      if(findPlanner === null) res.status(404).send("can't find the planner")
      else{
        planner.update({
          name:req.body.name
        },{
          where:{id:req.query.plannerId}
        })
        .then(item => {
          //마찬가지
          axios.get(`http://localhost:80/planner?plannerId=${findPlanner.id}`)
          .then(result => {
            res.status(200).json(result.data)
          })
        })
      }
    }
    catch(err){res.status(500).send('server error')}
  },

  deletePlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''
    try{
      const findPlanner = await planner.findOne({
        where:{id:req.query.plannerId},
      })
      if(findPlanner === null) res.status(404).send("can't find the planner")
      else{
        planner.destroy({
          where:{id:req.query.plannerId}
        })
        .then(item => res.status(200).send('ok'))
      }
    }
    catch(err){res.status(500).send('server error')}
  }
}