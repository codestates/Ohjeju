const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
const axios = require('axios')

//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');

//유저 정보 관련 method
module.exports = {
  getUserInfo: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''
    try{
      //토큰인증후 -> 인증안되면 메세지추가하는 res넣으면 될듯
      const findUser = await users.findOne({
        where:{id:req.query.userId}
      })
      if(findUser === null){ //이게 좀더 직관적이어서
        res.status(404).send("can't find the user")
      }
      else {res.status(200).json(findUser)}
    }
    catch(err){res.status(500).send('server error')}
  },

  modifyUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''
    try{
      const findUser = await users.findOne({
        where:{id:req.query.userId}
      })
      //토큰인증후 -> 위와동일
      if(findUser === null){
        res.status(404).send("can't find the user")
      }
      else{
        //추후 user info 변경시 비밀번호만 바꿀수도 or userName만 바꿀수도 있으니 상황에따라 코드 더추가해야함

        users.update({
          userName:req.body.userName,
          password:req.body.password
        },{
          where:{id:req.query.userId}
        })
        .then(item => {
          //group컨트롤러와 마찬가지이유
          axios.get(`http://localhost:80/user/info?userId=${req.query.userId}`)
          .then(result => {
            res.status(200).json(result.data)
          })
        })
      }
    }
    catch(err) {res.status(500).send('server error')}
  },

  deleteUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    //토큰인증후
    try{
      const findUser = await users.findOne({
        where:{id:req.query.userId}
      })
      //토큰인증후 -> 위와동일
      if(findUser === null){
        res.status(404).send("can't find the user")
      }
      else{
        users.destroy({
          where:{id:req.query.userId}
        })
        .then(item => res.status(200).send('ok'))
      }
    }
    catch(err){res.status(500).send('server error')}
  }
}