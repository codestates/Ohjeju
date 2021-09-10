//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');

//OAuth 인증 관련 method
module.exports = {
  OAuthKakao: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/kakao

    return res.status(200).send('OAuthKakao Test');
  },

  OAuthGoogle: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/google

    return res.status(200).send('OAuthGoogle Test');
  }
}