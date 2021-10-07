const { group, users, user_group } = require('../models')
const axios = require('axios')

const { verifyToken, decodeToken } = require('./VerifyToken');

//그룹 관련 method
module.exports = {
  createGroup: async (req, res) => {
    //* endpoint: https://ohjeju.link/group
    
    try{
      //그룹 만드는 유저는 leader로 설정. 따라서 현재 유저가 누구인지 정보가 필요함
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(401).send('Token expired'); //토큰 만료된 경우
      const tokenUser = await decodeToken(reqAccessToken);

      if(!tokenUser) return res.status(401).send('Invalid token') //토큰 내 데이터가 유효하지 않은 토큰일 경우
      else { //토큰 내 유저가 존재 -> 해당 유저가 그룹 생성 진행
        //그룹명이 안 넘어온 경우는 undefined으로 넘어오기때문에 굳이 길이까진 안 봐도 될 것 같아요
        if(!req.body.groupName) return res.status(400).send('Content is empty');
        else { //제대로 받아온 경우 그룹 생성
          const newGroupId = await group.create({
            name: req.body.groupName,
            leaderId: tokenUser.id
          })
          .then((group) => group.id)
          user_group.create({ userId: tokenUser.id, groupId: newGroupId })
          
          return res.status(201)
            .cookie('accessToken', reqAccessToken)
            .cookie('refreshToken', reqRefreshToken)
            .send({ groupId: newGroupId })
        }
      }

      // if(!req.body.groupName.length) {//0이던 undefind던 추후에 -> content없을때
      //   res.status(400).send('content is empty')
      // }
      // else{
      //   group.create({
      //     name:req.body.groupName,
      //     leader:'test' //추후 req.cookies.jwt 안에 있는거 verify하고 그안에잇는 유저될거 자세한건 민지님토큰함수보고
      //   })
      //   .then(item => res.status(201).send('ok'))
      // }
    }
    catch(err) { res.status(500).send('server error') }
  },

  getGroup: async (req, res) => {
    //* endpoint: https://ohjeju.link/group?groupId=''

    try{
      //조인테이블에서 groupId랑 일치하는 그룹+유저 찾아서 해당 그룹 안에 있는 유저 리턴
      const userGroup = await user_group.findAll({
        where: { groupId: req.query.groupId },
        include: [{ model: users }, { model: group }]
      })

      //userGroup: 해당 그룹 안의 유저를 return
      //해당 그룹 안에 유저가 없을 경우 빈 배열로 return
      if(userGroup.length === 0) return res.status(404).send('Can\'t find the group' );
      else { //조인된 유저 데이터를 클라에 전해줄 형태로 정리
        const userInGroup = userGroup.map((member) => {
          return {
            id: member.user.id,
            userName: member.user.userName,
            email: member.user.email,
            image: member.user.image
          }
        })

        let leaderName,leaderId
        const targetGroup = await group.findOne({
          where: { id: req.query.groupId }
        })
        const targetGroupLeader = await users.findOne({
          where: { id: targetGroup.leaderId }
        })
        .then((user) => {
          //return user.userName
          leaderName = user.userName
          leaderId = user.id
        })

        return res.status(200)
        //leaderId가 필요해서 임시로 대충짭니다 
          .send({
            groupId: targetGroup.id,
            groupName: targetGroup.name,
            //leader:targetGroupLeader
            leader: leaderName,
            leaderId: leaderId,
            user: userInGroup
          })
      }

      // const userGroup = await user_group.findAll({
      //   where:{
      //     groupId:req.query.groupId
      //   },
      //   include:[
      //     {model:users},
      //     {model:group}
      //   ]
      // })
      // if(!userGroup.length) res.status(404).send("can't find the group")
      // else{
      //   const userInGroup = userGroup.map(item => item.user.userName)
      //   res.status(200).json({
      //     user:userInGroup,
      //     leader:userGroup[0].group.leader,
      //     groupName:userGroup[0].group.name
      //   })
      // }
    }
    catch(err){ return res.status(500).send('server error') }
  },

  modifyGroup: async (req, res) => {
    //* endpoint: https://ohjeju.link/group?groupId=''
    
    //postman으로 수정data 받아오는거 전부 확인 + 복잡할수있어서 try catch안묶음 -> try catch문으로 변경
    //action 따라 진행
    try {
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      //여기가 null로잡힘 그래서 밑에 스위치문까지안감 -> 확인부탁
      if(!reqAccessToken) return res.status(401).send('Token expired');
      const tokenUser = await decodeToken(reqAccessToken);
      if(!tokenUser) return res.status(401).send('Invalid token');
      
      //0. 현재 이 요청을 한 유저가 leader인지 먼저 확인
      //-> 리더가 아니라면 403 응답(리더만 수정 가능)
      const targetGroup = await group.findOne({ where: { id: req.query.groupId } });
      if(tokenUser.id !== targetGroup.leaderId) return res.status(403).send('Authority unavailable');

      //1. 요청의 action따라 동작
      //모든 액션을 하기 전에 req.body에 수정될 email이 있는지 검색
      //+ 일단 해당 그룹에 해당 유저가 있는지 검색
      if(!req.body.email) return res.status(400).send('Bad Request')
      const targetGroupMember = await axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
        .then((res) => res.data)
        .then((group) => group.user.map((member) => member.email))

      switch(req.body.action) {
        case 'add': //그룹에 멤버 추가
          if(targetGroupMember.includes(req.body.email)) {
            //'T dhe user is already exist in group'
            return res.status(409).send('The user is already exist in group')
          }
          else {
            const addUserId = await users.findOne({ where: { email : req.body.email} })
              .then(async (user) => {
                user_group.create({userId:user.id,groupId:targetGroup.id})
                .then(()=>{
                  axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
                  .then(item => {
                    console.log('@!##!@')
                    console.log(item.data)
                    return res.status(200)
                    .cookie('accessToken', reqAccessToken)
                    .cookie('refreshToken', reqRefreshToken)
                    .send(item.data)
                  })
                  //밑에 delete와 마찬가지로 추가하고 바로 modifiedgroup이 최신화된 데이터가아닌 추가하기 전에데이터를 보내줘서수정햇습니다
                }
                )
              })

            // const modifiedGroup = await axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
            //   .then((res) => {
            //     console.log(res.data)
            //   })

            // return res.status(200)
            //   .cookie('accessToken', reqAccessToken)
            //   .cookie('refreshToken', reqRefreshToken)
            //   .send(modifiedGroup)
          }
          break;

        case 'delete': //그룹에서 멤버 삭제
          if(!targetGroupMember.includes(req.body.email)) {
            return res.status(404).send('can\'t find the group or user')
          }
          else {
              const deleteUserId = await users.findOne({ where: { email : req.body.email} })
              .then(async (user) => {
                user_group.destroy({where:{userId:user.id}})
                .then(()=>{
                  axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
                  .then(item => {
                    console.log('@!##!@')
                    console.log(item.data)
                    return res.status(200)
                    .cookie('accessToken', reqAccessToken)
                    .cookie('refreshToken', reqRefreshToken)
                    .send(item.data)
                  })
                }
                )
              })
            }
          break;

        case 'change leader': //그룹 리더 변경
        console.log('change')
          if(!targetGroupMember.includes(req.body.email)) {
            return res.status(404).send('can\'t find the group or user')
          }
          else {
            console.log('else')
            const newLeaderId = await users.findOne({ where: { email: req.body.email } })
              .then(async (user) => {
                //리더변경 버튼을 리더가 아니면 나오게하지 않게짜서 일단 주석처리함
                
                // if(targetGroup.leaderId === newLeaderId) return res.status(409).send('the user is already leader of this group')
                // else{
                  targetGroup.update({ leaderId: user.dataValues.id })
                  .then(()=>{
                    axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
                    .then(item => {
                      console.log('@!##!@')
                      console.log(item.data)
                      return res.status(200)
                      .cookie('accessToken', reqAccessToken)
                      .cookie('refreshToken', reqRefreshToken)
                      .send(item.data)
                  })
                })
              // }
            })
            // if(targetGroup.leaderId === newLeaderId) return res.status(409).send('the user is already leader of this group')
            // else {
            //   targetGroup.update({ leaderId: newLeaderId })

            //   const modifiedGroup = await axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
            //     .then((res) => res.data)

            //   return res.status(200)
            //     .cookie('accessToken', reqAccessToken)
            //     .cookie('refreshToken', reqRefreshToken)
            //     .send(modifiedGroup)
            // }
          }
          break;

        default:
          return res.status(400).send('Bad Request');
      }
    }
    catch(err) { return res.status(500).send('server error') }
    // if(!reqAccessToken)
    // //1. body에 email 있어야 진행 가능
    // if(req.body.email){ //body에 email content가 있어야로직돌림
    //   const findUser = await users.findOne({ //findUser.id
    //     where:{email:req.body.email}
    //   })
    //   const findGroup = await group.findOne({
    //     where:{id:req.query.groupId}
    //   })

    //   const hasUserInGroup = async (user) => { //해당그룹에 유저있나없나 검증함수
    //     if(user !== null){
    //       const userInGroup = await user_group.findOne({
    //         where:{userId:findUser.id},
    //         include:[{model:group},{model:users}]
    //       })
    //       return userInGroup
    //     }
    //     return null
    //   }

    //   if(findUser === null || findGroup === null){
    //     res.status(404).send("can't find the group or user")
    //   }
    //   else{ //뭘하던 일단 그유저가 해당 그룹에 있나부터 검사해야됨
    //     if(req.body.action === 'add'){
    //       const hasUser = await hasUserInGroup(findUser)
    //       if(hasUser === null){//없어야 add하지
    //        user_group.create({
    //           userId:findUser.id,
    //           groupId:findGroup.id //req.query.groupId도 상관없는데 통일성을위해
    //         })
    //         .then(item => {
    //           /*수정된 group info 보내줌 -> 별도요청안하고 sequelize함수 써서 받아올수있는데
    //           그럼 위에랑 같은코드가 또나옴 코드짜놓은걸로 요청 보내면 받는것도 api문서대로 받으니까 받은그대로
    //           다시 res해줘서 보내주는게 편한거같음*/
    //           axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
    //           .then(result => res.status(200).json(result.data))
    //         })
    //       }
    //     }
    //     if(req.body.action === 'delete'){ //있어야 delete하지
    //       const hasUser = await hasUserInGroup(findUser)
    //       if(hasUser !== null){
    //         user_group.destroy({
    //           where:{userId:findUser.id}
    //         })
    //         .then(item => {
    //           axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
    //           .then(result => res.status(200).json(result.data))
    //         })
    //       }
    //     }
    //     if(req.body.action === 'change leader'){ //있어야 change하지
    //       const hasUser = await hasUserInGroup(findUser)
    //       if(hasUser !== null){
    //         group.update({
    //           leader:findUser.userName
    //         },{
    //           where:{id:findGroup.id}
    //         })
    //         .then(item => {
    //           axios.get(`http://localhost:80/group?groupId=${findGroup.id}`)
    //           .then(result => res.status(200).json(result.data))
    //         })
    //       }
    //     }
    //   }
    // }
  },

  deleteGroup: async (req, res) => {
    //* endpoint: https://ohjeju.link/group?groupId=''

    try{
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(401).send('Token expired');
      const tokenUser = await decodeToken(reqAccessToken);
      if(!tokenUser) return res.status(401).send('Invalid token');
      
      //해당 유저가 삭제 권한이 있는지 먼저 확인
      //권한이 있으면 삭제
      const targetGroup = await group.findOne({ where: { id: req.query.groupId } })
      if(!targetGroup) return res.status(404).send('can\'t find the group');
      if(targetGroup.leaderId !== tokenUser.id) {
        return res.status(403).send('Authority unavailable')
      }
      else {
        //삭제할 때 user_group부터 삭제
        user_group.destroy({ where: { groupId: targetGroup.id } }) //req.query.groupId로 삭제해도 무방
        .then(() => { targetGroup.destroy() })

        return res.status(200)
          .cookie('accessToken', reqAccessToken)
          .cookie('refreshToken', reqRefreshToken)
          .send('group successfully deleted');
      }
      
      // const findGroup = await group.findOne({
      //   where:{id:req.query.groupId}
      // })
      // if(findGroup === null) res.status(404).send("can't find the group")
      // else{ //user_group table이 참조테이블이니 먼저 지워주고 그다음 원본키 있는 group을 지워줘야됨
      //   user_group.destroy({
      //     where:{groupId:findGroup.id} //req.query.groupId 도 상관없음 근데 위에 써왓던코드와 통일하기위해
      //   })
      //   .then(item => {
      //     group.destroy({
      //       where:{id:findGroup.id}
      //     })
      //     .then(item => res.status(200).send('ok'))
      //   })
      // }
    }
    catch(err) { return res.status(500).send('server error') }
  }
}