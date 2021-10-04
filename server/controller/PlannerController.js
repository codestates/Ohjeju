const axios  = require('axios');
const { group, plan, planner } = require('../models')

//플래너 관련 method
module.exports = {
  createPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner
    try{
      //body에서 넘겨준 isLogin 기준으로 1인/다인 구분. isLogin상태라면 token이 있는 것을 가정
      if(!req.body.name) return res.status(400).send('content is empty');
      else {
        if(!req.body.isLogin) { //로그인 상태가 아닐 경우 -> 1인 플래너만 생성
          const newPlannerId = await planner.create({
            name: req.body.name,
            groupId: null
          })
          .then((planner) => planner.id)
          
          //클라에서 어떻게 구현되냐에 따라 send 내용 생략할 수 있을 것 같아요. 일단은 필요할 것 같아서 plannerId 리턴했어요
          return res.status(201).send({ plannerId: newPlannerId });
        }
        else { //로그인 상태일 경우 -> 다인 플래너로 생성
          const newGroupId = await axios.post('http://localhost:80/group', { groupName: 'New Group' }, {
            headers: { //현재 갖고있는 쿠키로 쿠키 만들어서 보내줌
              cookie: `accessToken=${req.cookies.accessToken};refreshToken=${req.cookies.refreshToken}`
            },
            withCredentials: true
          })
          .then((res) => res.data.groupId)

          const newPlanner = await planner.create({
            name: req.body.name,
            groupId: newGroupId
          })
          .then((planner) => planner)

          return res.status(201).send(newPlanner);
        }
      }
      
      // if(req.body.name.length === 0){ //빈칸인지 undefined지는 알아서
      //   res.status(400).send("content is empty")
      // }
      // else{
      //   if(req.body.groupId) {// 그룹이 생성 되고 플래너 생성할때
      //     planner.create({
      //       name:req.body.name,
      //       groupId:req.body.groupId
      //     }).then(item => res.status(201).send('ok'))
      //   }
      //   else { //플래너 생성 하고 그룹생성할때 -> 이거 어떻게할건지 얘기해봐야됨 순서를 강제할건지
      //     //정해지면 추후작성
      //   }
      // }
      // return res.status(200).send('test');
    }
    catch(err) { return res.status(500).send('server error') }
  },
  
  getPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''
    try {
      console.log('getPlanner')
      const targetPlanner = await planner.findOne({
        where: { id: req.query.plannerId },
        include: [ { model: group } ]
      })
      if(!targetPlanner) return res.status(404).send('can\'t find the planner');

      const planInThis = await plan.findAll({ where: { plannerId: targetPlanner.id } })
        .then((plans) => plans.map((plan) => {
          const { id, day, departureTime, destination, memo } = plan;
          return { id, day, departureTime, destination, memo };
        }))

      const customPlanner = (planArr) => {
        const planner = new Object();

        for(const plan of planArr) {
          if(!planner[plan.day]) planner[plan.day] = new Array();
          planner[plan.day].push({
            id: plan.id,
            departureTime: plan.departureTime,
            destination: plan.destination,
            memo: plan.memo
          })
        }
        for(const day in planner) planner[day].sort((a, b) => a.departureTime - b.departureTime);

        return planner;
      }
      const customedPlanner = customPlanner(planInThis);

      if(!targetPlanner.group) { //1인 플래너일 경우
        return res.status(200).send({
          id:targetPlanner.id,
          name: targetPlanner.name,
          group: null,
          plan: customedPlanner
        });
      }
      else { //다인 플래너일 경우
        const groupInThis = await axios.get(`http://localhost:80/group?groupId=${targetPlanner.groupId}`)
          .then((res) => res.data)
        
        return res.status(200).send({
          id:targetPlanner.id,
          name: targetPlanner.name,
          group: groupInThis,
          plan: customedPlanner
        })
      }
      // const findPlanner = await planner.findOne({
      //   where:{id:req.query.plannerId},
      //   include:[{model:group}]
      // })
      // const userGroup = await user_group.findAll({
      //   where:{groupId:findPlanner.group.id},
      //   include:[{model:users},{model:group}]
      // }) //얘는이상하게 axios해서 받아올려하면 오류남 그래서 그냥 sequelize함수로
      // const userInGroup = userGroup.map(item => item.user.userName)
      // const findPlan = await plan.findAll({
      //   where:{plannerId:req.query.plannerId}
      // })
      // const customPlan = () => {
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
  
      //   const resultPlan = {}
      //   findPlan.forEach(item => {
      //     const {id,departureTime,destination,memo,day} = item
      //     const VAR = `day${item.day}`
      //     if(!resultPlan[VAR]){
      //       resultPlan[VAR] =[];
      //       resultPlan[VAR].push({
      //         id,departureTime,destination,memo,day
      //       })
      //     }
      //     else{
      //       resultPlan[VAR].push({
      //         id,departureTime,destination,memo,day
      //       })
      //     }
      //   })
      //   return resultPlan
      // }
      // if(findPlanner === null) res.status(404).send("can't find the planner")
      // else{
      //   const resultPlan = customPlan();
      //   res.json({
      //     plan:resultPlan,
      //     group:{
      //       groupId:findPlanner.group.id,
      //       userName:userInGroup
      //     },
      //     name:findPlanner.name
      //   })
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  modifyPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''
    try{
      const targetPlanner = await planner.findOne({ where: { id: req.query.plannerId } })
      if(!targetPlanner) return res.status(404).send('can\'t find the planner');
      
      targetPlanner.update({ name: req.body.name })
      const modifiedPlanner = await axios.get(`http://localhost:80/planner?plannerId=${targetPlanner.id}`)
        .then((res) => res.data)

      return res.status(200).send(modifiedPlanner)

      // const findPlanner = await planner.findOne({
      //   where:{id:req.query.plannerId},
      // })
      // if(findPlanner === null) res.status(404).send("can't find the planner")
      // else{
      //   planner.update({
      //     name:req.body.name
      //   },{
      //     where:{id:req.query.plannerId}
      //   })
      //   .then(item => {
      //     //마찬가지
      //     axios.get(`http://localhost:80/planner?plannerId=${findPlanner.id}`)
      //     .then(result => {
      //       res.status(200).json(result.data)
      //     })
      //   })
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  deletePlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''

    try{
      //그룹 리더일 경우에만 플래너 삭제 가능
      //1인플래너는? -> 그냥 삭제? / 토큰이 없기때문에 나중에 다시 와서 삭제하는 기능은 구현불가능
      //일단 코드는 1인플래너는 그냥 삭제하는 쪽으로 작성했어요
      const targetPlanner = await planner.findOne({
        where: { id: req.query.plannerId },
        include: [{ model: group }]
      });
      if(!targetPlanner) return res.status(404).send('can\'t find the planner');

      if(!targetPlanner.group) { //1인 플래너일 경우
        targetPlanner.destroy();
        return res.status(200).send('ok');
      }
      else { //다인 플래너일 경우 -> 그룹까지 삭제해야함
        console.log(targetPlanner.group.id)
        axios.delete(`http://localhost:80/group?groupId=${targetPlanner.group.id}`, {
          headers: {
            cookie: `accessToken=${req.cookies.accessToken};refreshToken=${req.cookies.refreshToken}`
          },
          withCredentials: true
        })
          .then(() => {
            targetPlanner.destroy()
          })

        return res.status(200).send('ok');
      }

      // const findPlanner = await planner.findOne({
      //   where:{id:req.query.plannerId},
      // })
      // if(findPlanner === null) res.status(404).send("can't find the planner")
      // else{
      //   planner.destroy({
      //     where:{id:req.query.plannerId}
      //   })
      //   .then(item => res.status(200).send('ok'))
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  }
}