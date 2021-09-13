const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');

//유저 로그인 상태 관련 method
module.exports = {
  signIn: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signin
    try{
      const findUser = await users.findOne({
        where:{
          email:req.body.email,
          password:req.body.password
        }
      })
      if(findUser !== null){
        res.status(200).send('ok')
      }
      else{
        res.status(400).send('not authorized')
      }
    }
    catch(err) {res.status(500).send('server error')}
    //이후토큰처리문제는 얘기
  },
  
  signUp: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signup
    try{
      const findUser = await users.findOne({
        where:{email:req.body.email}
      })
      if(findUser !== null){ //해당 email가진 유저가 존재할때
        res.status(409).send("this email already exists")
      }
      else{ //위에 중복유저가 없을때 -> 가입절차
        if(!req.body.email || !req.body.password){ //둘중하나없을때(required한 부분)
          res.status(400).send('no content')
        }
        else{ //둘다채웟을때
          users.create({
            email:req.body.email,
            password:req.body.password,
            userName:'Default'
            //image , userName은 마이페이지에서 수정하도록 한다고했음 맨처음 userName은 디폴틀값으로 들어갈듯
          })
          .then(item => {
            res.status(201).send('ok')
          })
        }
      }
      
    }
    catch(err){res.status(500).send('server error')}
  },

  signOut: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signout

    //토큰없애기
  }
}