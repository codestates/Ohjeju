const { group, plan, planner } = require('../models')
const axios  = require('axios');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:80';

//플래너 관련 method
module.exports = {
  createPlanner: async (req, res) => {
    //* endpoint: https://ohjeju.link/planner
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
          const newGroupId = await axios.post(`${SERVER_URL}/group`, { groupName: 'New Group' }, {
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
    }
    catch(err) { return res.status(500).send('server error') }
  },
  
  getPlanner: async (req, res) => {
    //* endpoint: https://ohjeju.link/planner?plannerId=''
    try {
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
      // const customedPlanner = customPlanner(planInThis);
      const customedPlanner = planInThis;

      if(!targetPlanner.group) { //1인 플래너일 경우
        return res.status(200).send({
          id:targetPlanner.id,
          name: targetPlanner.name,
          group: null,
          plan: customedPlanner
        });
      }
      else { //다인 플래너일 경우
        const groupInThis = await axios.get(`${SERVER_URL}/group?groupId=${targetPlanner.groupId}`)
          .then((res) => res.data)
        
        return res.status(200).send({
          id:targetPlanner.id,
          name: targetPlanner.name,
          group: groupInThis,
          plan: customedPlanner
        })
      }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  modifyPlanner: async (req, res) => {
    //* endpoint: https://ohjeju.link/planner?plannerId=''
    try{
      const targetPlanner = await planner.findOne({ where: { id: req.query.plannerId } })
      if(!targetPlanner) return res.status(404).send('can\'t find the planner');
      
      targetPlanner.update({ name: req.body.name })
      const modifiedPlanner = await axios.get(`${SERVER_URL}}/planner?plannerId=${targetPlanner.id}`)
        .then((res) => res.data)

      return res.status(200).send(modifiedPlanner)
    }
    catch(err) { return res.status(500).send('server error') }
  },

  deletePlanner: async (req, res) => {
    //* endpoint: https://ohjeju.link/planner?plannerId=''

    try{
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
        axios.delete(`${SERVER_URL}/group?groupId=${targetPlanner.group.id}`, {
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
    }
    catch(err) { return res.status(500).send('server error') }
  }
}