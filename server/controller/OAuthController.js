const { users } = require('../models')
const jwt = require('jsonwebtoken');
const axios = require('axios');

//OAuth 인증 관련 method
module.exports = {
  OAuthKakao: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/kakao

    try {
      const redirect_uri = 'http://localhost:3000/OAuth/kakao';
      const client_id = process.env.KAKAO_REST_KEY;
      const client_secret = process.env.KAKAO_CLIENT_SECRET;
  
      const tokenAccessURI = new Array(6);
      tokenAccessURI[0] = `https://kauth.kakao.com/oauth/token?`;
      tokenAccessURI[1] = `grant_type=authorization_code&`;
      tokenAccessURI[2] = `client_id=${client_id}&`;
      tokenAccessURI[3] = `redirect_uri=${redirect_uri}&`;
      tokenAccessURI[4] = `client_secret=${client_secret}&`;
      tokenAccessURI[5] = `code=${req.body.code}`;
      
      const [kakaoAccessToken, kakaoRefreshToken] = await axios.post(tokenAccessURI.join(''))
        .then((res) => [res.data.access_token, res.data.refresh_token])
        .catch((err) => { return res.status(401).send('can\'t get kakao access token') })
  
      const kakaoUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`
        }
      }).then((info) => { return { //회원가입/로그인을 클라에서 진행하지 말고 서버에서 하는 방향으로 수정
        userName: info.data.kakao_account.profile.nickname,
        email: info.data.kakao_account.email,
        image: info.data.kakao_account.profile.profile_image_url,
        password: process.env.KAKAO_LOGIN_PASSWORD //dummy data
      } })

      //findOrCreate로 유저 정보 저장하고 있는데
      //이 과정을 그냥 user에서 검색해서 있으면 signin, 없으면 signup 요청 보내는 것으로 수정
      //-> findOrCreate로 만들어놓고 해당 유저 정보로 로그인 요청하고 리다이렉션

      const kakaoUser = await users.findOrCreate({
        where: { email: kakaoUserInfo.email },
        defaults: {
          password: kakaoUserInfo.password,
          userName: kakaoUserInfo.userName,
          image: kakaoUserInfo.image
        }
      })
      .then((arr) => arr[0])
      .then((data) => {
        return {
          id: data.id,
          email: data.email
        }
      })

      return res.status(200).send(kakaoUser);
    }
    catch(err) { return res.status(500).send('server error') }
  },

  OAuthGoogle: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/google

    if(req.body.hash){
      const accessToken = req.body.hash.split("=")[1].split("&")[0];  //hash 부분에서 accessToken을 떼어준다
      await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
        headers: { 
          authorization: `token ${accessToken}`,    //어세스토큰을 통해 유저정보를 요청한다
          accept: 'application/json' 
        }
      }).then(item => {
        res.status(200).json(item.data)   //요청된 유저정보데이터
      })
      .catch((err)=>{
        console.log('구글로그인 에러')
      })
    }
    
  }
}