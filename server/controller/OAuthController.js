//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');
const axios = require('axios')

//OAuth 인증 관련 method
module.exports = {
  OAuthKakao: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/OAuth/kakao

    const redirect_uri = 'http://localhost:3000/OAuth/kakao'
    const client_id = process.env.KAKAO_REST_KEY || '0f8bff12e99bf62cf63de306e104978b'
    // 나중에 뒷키 지워야함
    const client_secret = process.env.KAKAO_CLIENT_SECRET ||'I7VJ0NlhM1pXQi9ncFZjqMyPjpNum8Se'
    // 나중에 뒷키 지워야함
    let a = 'https://kauth.kakao.com/oauth/token?'
    let b = `grant_type=authorization_code&`
    let c = `client_id=${client_id}&`
    let d = `redirect_uri=${redirect_uri}&`
    let e = `client_secret=${client_secret}&`
    let f = `code=${req.body.code}`
    let result = a+b+c+d+e+f

    console.log(`인가코드${req.body.code}`)
    
    const getAccess_token =  await axios.post(result)

    console.log(`어세스토큰${getAccess_token.data.access_token}`)
    
       if(getAccess_token){
           const ACCESS_TOKEN = getAccess_token.data.access_token
           axios.get('https://kapi.kakao.com/v2/user/me',{  //어세스토큰을 통해 유저정보를 요청한다
               headers:{
                Authorization:`Bearer ${ACCESS_TOKEN}`
               }
           }).then(item => {
               res.status(200).json(item.data) //요청된 유저정보데이터
           })
           .catch((err)=>{
             console.log('카카오로그인 에러')
           })
       }
       
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