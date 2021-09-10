//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');

//유저 로그인 상태 관련 method
module.exports = {
  signIn: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signin
    
    return res.status(200).send('signIn Test');
  },
  
  signUp: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signup
    
    return res.status(200).send('signUp Test');
  },

  signOut: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/signout

    return res.status(200).send('signOut Test');
  }
}