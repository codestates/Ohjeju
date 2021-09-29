const { group, users, user_group } = require('../models')
//! 지금 mysql에서 group 테이블 조회가 안돼서 테이블 이름 groups로 바꾸거나 해야될 거 같아요
//! 명령어 충돌나서 조회 불가능
const axios = require('axios')
//필요한 모델 require 해와야 함

const { verifyToken, decodeToken } = require('./VerifyToken');

//그룹 관련 method
module.exports = {
  createGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group
    
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
            //group이라는 모델 자체가 스키마에 없네요?
            name: req.body.groupName,
            leader: tokenUser.userName
          })
          .then((group) => group.id)
          user_group.create({ userId: tokenUser.id, groupId: newGroupId })
          
          //create 요청이라 200번보단 201이 맞는거같아요. API문서 수정 부탁드려요.
          return res.status(201)
            .cookie('accessToken', reqAccessToken)
            .cookie('refreshToken', reqRefreshToken)
            .send({ groupId: newGroupId })
        }
      }
    }
    catch(err) { res.status(500).send('server error') }
  },

  getGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''

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

        const findGroup = await group.findOne({
          where: { id: req.query.groupId }
        })

        return res.status(200)
          .send({
            groupId: findGroup.id,
            groupName: findGroup.name,
            leader: findGroup.leader,
            user: userInGroup
          })
      }
    }
    catch(err){ return res.status(500).send('server error') }
  },

  modifyGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''
    
    //action 따라 진행
    try {
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(401).send('Token expired');
      const tokenUser = await decodeToken(reqAccessToken);
      if(!tokenUser) return res.status(401).send('Invalid token');
      
      //0. 현재 이 요청을 한 유저가 leader인지 먼저 확인
      //-> 리더가 아니라면 403 응답(리더만 수정 가능)
      const targetGroup = await group.findOne({ where: { id: req.query.groupId } });
      if(tokenUser.userName !== targetGroup.leader) return res.status(403).send('Authority unavailable');

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
            return res.status(409).send('The user is already exist in group')
          }
          else {
            const addUserId = await users.findOne({ where: { email : req.body.email} })
              .then((user) => user.id)
            user_group.create({ userId: addUserId, groupId: targetGroup.id });

            const modifiedGroup = await axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
              .then((res) => res.data)

            return res.status(200)
              .cookie('accessToken', reqAccessToken)
              .cookie('refreshToken', reqRefreshToken)
              .send(modifiedGroup)
          }
          break;

        case 'delete': //그룹에서 멤버 삭제
          if(!targetGroupMember.includes(req.body.email)) {
            return res.status(404).send('can\'t find the group or user')
          }
          else {
            const deleteUserId = await users.findOne({ where: { email: req.body.email } })
              .then((user) => user.id)
            user_group.destroy({ where: { userId: deleteUserId } });

            const modifiedGroup = await axios.get(`http://localhost:80/group?groupId=${targetGroup.id}`)
              .then((res) => res.data)

            return res.status(200)
              .cookie('accessToken', reqAccessToken)
              .cookie('refreshToken', reqRefreshToken)
              .send(modifiedGroup)
          }
          break;

        case 'change leader': //그룹 리더 변경
          if(!targetGroupMember.includes(req.body.email)) {
            return res.status(404).send('can\'t find the group or user')
          }
          else {
            const newLeaderName = await users.findOne({ where: { email: req.body.email } })
              .then((user) => user.userName)
            if(targetGroup.leader === newLeaderName) return res.status(409).send('the user is already leader of this group')
            else {
              targetGroup.update({ leader: newLeaderName })

              const modifiedGroup = await axios.get(`http://localhost:90/group?groupId=${targetGroup.id}`)
                .then((res) => res.data)

              return res.status(200)
                .cookie('accessToken', reqAccessToken)
                .cookie('refreshToken', reqRefreshToken)
                .send(modifiedGroup)
            }
          }
          break;

        default:
          return res.status(400).send('Bad Request');
      }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  deleteGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''

    try{
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);
      if(!reqAccessToken) return res.status(401).send('Token expired');
      const tokenUser = await decodeToken(reqAccessToken);
      if(!tokenUser) return res.status(401).send('Invalid token');
      
      //해당 유저가 삭제 권한이 있는지 먼저 확인
      //권한이 있으면 삭제
      const targetGroup = await group.findOne({ where: { id: req.query.groupId } })
      if(!targetGroup) return res.status(404).send('can\'t find the group');
      if(targetGroup.leader !== tokenUser.userName) {
        return res.status(403).send('Authority unavailable')
      }
      else {
        //삭제할 때 user_group부터 삭제
        user_group.destroy({ where: { groupId: targetGroup.id } })
        .then(() => { targetGroup.destroy() })

        return res.status(200)
          .cookie('accessToken', reqAccessToken)
          .cookie('refreshToken', reqRefreshToken)
          .send('ok');
      }
    }
    catch(err) { res.status(500).send('server error') }
  }
}