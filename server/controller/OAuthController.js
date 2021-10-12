const { users } = require('../models')
const axios = require('axios');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

//OAuth 인증 관련 method
module.exports = {
  OAuthKakao: async (req, res) => {
    //* endpoint: https://ohjeju.link/OAuth/kakao

    try {
      const redirect_uri = `${CLIENT_URL}/OAuth/kakao`;
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
      }).then((info) => { return { //회원가입을 클라에서 진행하지 말고 서버에서 하는 방향으로 수정
        userName: info.data.kakao_account.profile.nickname,
        email: info.data.kakao_account.email,
        image: info.data.kakao_account.profile.profile_image_url,
        password: process.env.KAKAO_LOGIN_PASSWORD //dummy data
      } })

      const kakaoUser = await users.findOrCreate({
        where: { email: kakaoUserInfo.email },
        defaults: {
          password: kakaoUserInfo.password,
          userName: kakaoUserInfo.userName,
          image: kakaoUserInfo.image
        }
      })
      .then((user) => user[0])
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
    //* endpoint: https://ohjeju.link/OAuth/google

    try {
      const accessToken = req.body.hash.split('=')[1].split('&')[0];
      const googleUserInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, { 
        headers: { //accessToken 이용해 유저 정보 요청
          authorization: `token ${accessToken}`,
          accept: 'application/json' 
        }
      })
      .then((res) => {
        return {
          email: res.data.email,
          password: process.env.GOOGLE_LOGIN_PASSWORD,
          userName: 'Google User',
          image: res.data.picture
        }
      })

      const googleUser = await users.findOrCreate({
        where: { email: googleUserInfo.email },
        defaults: {
          password: googleUserInfo.password,
          userName: googleUserInfo.userName,
          image: googleUserInfo.image
        }
      })
      .then((user) => user[0])
      .then((data) => {
        return {
          id: data.id,
          email: data.email
        }
      })

      return res.status(200).send(googleUser);
    }
    catch(err) { return res.status(500).send('server error') }
  }
}