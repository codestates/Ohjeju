const { group, planner, users, user_group} = require('../models')
//const axios = require('axios');
//const jwt = require('jsonwebtoken');

const { verifyToken, decodeToken } = require('./VerifyToken');

//유저 정보 관련 method
module.exports = {
  getUserInfo: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    try{
      //토큰인증후 -> 인증안되면 메세지추가하는 res넣으면 될듯
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(403).send('can\'t access');
      const tokenUser = await decodeToken(reqAccessToken);
      
      //토큰 안에 들어있는 유저의 아이디가 쿼리로 받은 아이디와 일치하는지 확인
      if(!tokenUser) return res.status(403).send('can\'t access');
      else if(tokenUser.id !== Number(req.query.userId)) return res.status(404).send('can\'t find the user');
      else if(tokenUser.id === Number(req.query.userId)){
        //일치하는 경우에만 유저 정보 반환
        return res.status(200)
          .cookie('accessToken', reqAccessToken)
          .cookie('refreshToken', reqRefreshToken)
          .send({
            //넘겨주는 정보는 클라에서 필요한 정보에 따라 수정
            id: tokenUser.id,
            email: tokenUser.email,
            userName: tokenUser.userName,
            plannerId: tokenUser.plannerId,
            admin: tokenUser.admin,
            image: tokenUser.image
          })
      }
    }
    catch(err) {
      console.log(err);
      return res.status(500).send('server error');
    }
  },

  getUserPlannerList: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/planner?userId=''

    try {
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(403).send('can\'t access');
      const tokenUser = await decodeToken(reqAccessToken);

      if(!tokenUser) return res.status(403).send('can\'t access');
      else if(tokenUser.id !== Number(req.query.userId)) return res.status(404).send('can\'t find the user');
      else if(tokenUser.id === Number(req.query.userId)) {
        const targetGroups = await user_group.findAll({ where: { userId: tokenUser.id } })
          .then((user_groups) => user_groups.map((user_group) => user_group.groupId))
          .then((groups) => groups.map(async (group) => {
            const targetPlanner = await planner.findOne({ where: { groupId: group } })
            return targetPlanner
          }))

        const targetPlanners = await Promise.all(targetGroups)
          .then((planners) => planners.map((planner) => {
            return {
              id: planner.id,
              name: planner.name
            }
          }))

        return res.status(200)
        .cookie('accessToken', reqAccessToken)
        .cookie('refreshToken', reqRefreshToken)
        .send(targetPlanners)
      }
    }
    catch(err) { console.log(err); return res.status(500).send('server error') }
  },

  modifyUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    try {
      //현재 유저의 userName, password 갱신
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(403).send('can\'t access');
      const tokenUser = await decodeToken(reqAccessToken);

      //토큰 안에 들어있는 유저의 아이디가 쿼리로 받은 아이디와 일치하는지 확인
      if(!tokenUser) return res.status(403).send('can\'t access');
      else if(tokenUser.id !== Number(req.query.userId)) return res.status(404).send('can\'t find the user');
      else if(tokenUser.id === Number(req.query.userId)) {
        //일치하는 경우에만 정보 수정
        const curUser = await users.findOne({ where: { id: tokenUser.id } });

        for(let key in req.body) {
          curUser.update({
            [key] : req.body[key]
          });
        }

        return res.status(200)
          .cookie('accessToken', reqAccessToken)
          .cookie('refreshToken', reqRefreshToken)
          .send({
            id: curUser.id,
            email: curUser.email,
            userName: curUser.userName,
            plannerId: curUser.plannerId,
            admin: curUser.admin,
            image: curUser.image
          });
      }
    }
    catch(err) {
      console.log(err);
      return res.status(500).send('server error')
    }
  },

  deleteUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    try{
      //토큰 인증 후 쿼리로 받은 아이디와 일치하는지 항상 확인
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(401).send('not authorized');
      const tokenUser = await decodeToken(reqAccessToken);

      if(!tokenUser) return res.status(401).send('not authorized');
      else if(tokenUser.id !== Number(req.query.userId)) return res.status(404).send('can\'t find the user');
      else if(tokenUser.id === Number(req.query.userId)) {
        //일치하는 경우에만 탈퇴 진행
        const curUser = await users.findOne({ where: { id: tokenUser.id } });

        curUser.destroy()
          .then(_ => {
            return res.status(200)
              .clearCookie('accessToken')
              .clearCookie('refreshToken')
              .send('ok');
          })
      }
    }
    catch(err) { res.status(500).send('server error') }
  }
}