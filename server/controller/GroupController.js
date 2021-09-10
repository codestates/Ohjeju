const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')
const axios = require('axios')
//필요한 모델 require 해와야 함

//그룹 관련 method
module.exports = {
  createGroup: async (req, res) => {
    //나중에 user를 초대하는지 or 아예 유저를 정해서 그룹을 만드는지에 따라 user_group쪽도 같이 만져줘야할수도 있음
    //* endpoint: https://www.Ohjeju.com/group
    try{
      if(!req.body.groupName.length) {//0이던 undefind던 추후에 -> content없을때
        res.status(400).send('content is empty')
      }
      else{
        group.create({
          name:req.body.groupName,
          leader:'test' //추후 req.cookies.jwt 안에 있는거 verify하고 그안에잇는 유저될거 자세한건 민지님토큰함수보고
        })
        .then(item => res.status(200).send('ok'))
      }
    }
    catch(err){
      res.status(500).send('server error')
    }
  },

  getGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''
    try{
      const userGroup = await user_group.findAll({
        where:{
          groupId:req.query.groupId
        },
        include:[
          {model:users},
          {model:group}
        ]
      })
      if(!userGroup.length) res.status(404).send("can't find the group")
      else{
        const userInGroup = userGroup.map(item => item.user.userName)
        res.status(200).json({
          user:userInGroup,
          leader:userGroup[0].group.leader,
          groupName:userGroup[0].group.name
        })
      }
    }
    catch(err){
      res.status(500).send('server error')
    }
  },

  modifyGroup: async (req, res) => { //postman으로 수정data 받아오는거 전부 확인 + 복잡할수있어서 try catch안묶음
    //* endpoint: https://www.Ohjeju.com/group?groupId=''
    if(req.body.email){ //body에 email content가 있어야로직돌림
      const findUser = await users.findOne({ //findUser.id
        where:{email:req.body.email}
      })
      const findGroup = await group.findOne({
        where:{id:req.query.groupId}
      })

      const hasUserInGroup = async (user) => { //해당그룹에 유저있나없나 검증함수
        if(user !== null){
          const userInGroup = await user_group.findOne({
            where:{userId:findUser.id},
            include:[{model:group},{model:users}]
          })
          return userInGroup
        }
        return null
      }

      if(findUser === null || findGroup === null){
        res.status(404).send("can't find the group or user")
      }
      else{ //뭘하던 일단 그유저가 해당 그룹에 있나부터 검사해야됨
        if(req.body.action === 'add'){
          const hasUser = await hasUserInGroup(findUser)
          if(hasUser === null){//없어야 add하지
           user_group.create({
              userId:findUser.id,
              groupId:findGroup.id //req.query.groupId도 상관없는데 통일성을위해
            })
            .then(item => {
              /*수정된 group info 보내줌 -> 별도요청안하고 sequelize함수 써서 받아올수있는데
              그럼 위에랑 같은코드가 또나옴 코드짜놓은걸로 요청 보내면 받는것도 api문서대로 받으니까 받은그대로
              다시 res해줘서 보내주는게 편한거같음*/
              axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
              .then(result => res.status(200).json(result.data))
            })
          }
        }
        if(req.body.action === 'delete'){ //있어야 delete하지
          const hasUser = await hasUserInGroup(findUser)
          if(hasUser !== null){
            user_group.destroy({
              where:{userId:findUser.id}
            })
            .then(item => {
              axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
              .then(result => res.status(200).json(result.data))
            })
          }
        }
        if(req.body.action === 'change leader'){ //있어야 change하지
          const hasUser = await hasUserInGroup(findUser)
          if(hasUser !== null){
            group.update({
              leader:findUser.userName
            },{
              where:{id:findGroup.id}
            })
            .then(item => {
              axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
              .then(result => res.status(200).json(result.data))
            })
          }
        }
      }
    }
    // return res.status(200).send('modifyGroup Test');
  },

  deleteGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''
    try{
      const findGroup = await group.findOne({
        where:{id:req.query.groupId}
      })
      if(findGroup === null) res.status(404).send("can't find the group")
      else{ //user_group table이 참조테이블이니 먼저 지워주고 그다음 원본키 있는 group을 지워줘야됨
        user_group.destroy({
          where:{groupId:findGroup.id} //req.query.groupId 도 상관없음 근데 위에 써왓던코드와 통일하기위해
        })
        .then(item => {
          group.destroy({
            where:{id:findGroup.id}
          })
          .then(item => res.status(200).send('ok'))
        })
      }
    }
    catch(err){res.status(500).send('server error')}
  }
}