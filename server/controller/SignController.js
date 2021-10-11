require('dotenv').config();
const Users = require('../models').users;
const jwt = require('jsonwebtoken');

const { verifyToken, decodeToken } = require('./VerifyToken');
const ACCESS_COOKIE_OPTIONS = {
  MaxAge: 1000 * 60 * 60,
  domain: 'ohjeju.link',
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'none'
}
const REFRESH_COOKIE_OPTIONS = {
  MaxAge: 1000 * 60 * 60 * 24 * 14,
  domain: 'ohjeju.link',
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'none'
}

//유저 로그인 상태 관련 method
module.exports = {
  signIn: async (req, res) => {
    //* endpoint: https://ohjeju.link/signin

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
          .cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS)
          .cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
          .send({ "id" : id });
      }
    }
    catch(err) { return res.status(500).send('server error') }
  },
  
  signUp: async (req, res) => {
    //* endpoint: https://ohjeju.link/signup

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
          const newUserId = await Users.create({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName || 'Default',
            image: req.body.image || null
          }).then((user) => user.id)

          return res.status(201).send({ "id" : newUserId });
        }
      }
    }
    catch(err) { return res.status(500).send('server error') }
  },

  signOut: async (req, res) => {
    //* endpoint: https://ohjeju.link/signout

    //토큰 확인해서 해당 토큰이 유효할 경우에만 로그아웃
    try {
      const [reqAccessToken, reqRefreshToken] = await verifyToken(req);

      const curUser = await decodeToken(reqAccessToken);
      if(curUser) return res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .send('sign out successfully')
    }
    catch(err) { return res.status(500).send('server error') }
  }
}