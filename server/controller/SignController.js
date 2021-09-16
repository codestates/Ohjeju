const Users = require('../models').users;
const jwt = require('jsonwebtoken');

const { verifyToken, decodeToken } = require('./VerifyToken');

//유저 로그인 상태 관련 method
module.exports = {
  signIn: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signin
    try {
      const findUser = await Users.findOne({
        where:  {
          email: req.body.email,
          password: req.body.password
        }
      })

      if(!findUser) return res.status(400).send('not authorized');
      else {
        const { id, email, userName } = findUser;
        const tokenPayload = { id, email, userName };
  
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_SECRET, { expiresIn : '1h' });
        const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_SECRET, { expiresIn : '14d' });
  
        return res.status(200)
          .cookie('accessToken', accessToken)
          .cookie('refreshToken', refreshToken)
          .send({
            "id" : id
          });
      }
    }
    catch(err) { return res.status(500).send('server error') } //아이디 패스워드 불일치부분이 여기해당하는지 여쭙고 싶습니다(최용석)
    //이후토큰처리문제는 얘기
  },
  
  signUp: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signup

    try {
      const findUser = await Users.findOne({
        where : { email : req.body.email }
      })

      //해당 email을 가진 유저가 이미 존재할 때
      if(findUser) res.status(409).send('this email is already exists');
      else { //해당 email로 가입이 되어있지 않으면 -> 가입절차 진행
        //email이나 password가 입력되어있지 않은 경우
        if(!req.body.email || !req.body.password) return res.status(400).send('no content');
        else { //required한 정보가 정상적으로 입력이 되어있는 경우
          Users.create({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName || 'Default',
            image: req.body.image || null
          })

          return res.status(201).send('ok');
        }
      }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  signOut: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signout
    //signOut부분은 토큰 관리 함수 템플릿 만들고나서 다시 바꿔둘게요

    //토큰 확인해서 해당 토큰이 유효할 경우에만 로그아웃
    try {
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);

      const curUser = decodeToken(reqAccessToken);
      if(curUser) return res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .send('sign out successfully')
    }
    //catch에서 토큰이 유효하지 않은 경우도 잡히는데 API에 401같은거 있어야될거같아요 invalid token으로
    catch(err) { return res.status(500).send('server error') }
  }
}