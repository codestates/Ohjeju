//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');
const axios = require('axios')

//OAuth 인증 관련 method
module.exports = {
  OAuthKakao: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/kakao

    const redirect_uri = 'http://localhost:3000/OAuth/kakao'
    const client_id = process.env.KAKAO_REST_KEY || '0f8bff12e99bf62cf63de306e104978b'
    const client_secret = process.env.KAKAO_CLIENT_SECRET ||'I7VJ0NlhM1pXQi9ncFZjqMyPjpNum8Se'

    let a = 'https://kauth.kakao.com/oauth/token?'
    let b = `grant_type=authorization_code&`
    let c = `client_id=${client_id}&`
    let d = `redirect_uri=${redirect_uri}&`
    let e = `client_secret=${client_secret}&`
    let f = `code=${req.body.code}`
    let result = a+b+c+d+e+f
    
    const getAccess_token =  await axios.post(result)
    
       if(getAccess_token){
           const ACCESS_TOKEN = getAccess_token.data.access_token
           axios.get('https://kapi.kakao.com/v2/user/me',{
               headers:{
                Authorization:`Bearer ${ACCESS_TOKEN}`
               }
           }).then(item => {
               res.status(200).json(item.data)
           })
       }
       else{console.log('err')}
  },

  OAuthGoogle: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/google

    return res.status(200).send('OAuthGoogle Test');
  }
}