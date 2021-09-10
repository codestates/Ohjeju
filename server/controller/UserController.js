//필요한 모델 require 해와야 함
const jwt = require('jsonwebtoken');

//유저 정보 관련 method
module.exports = {
  getUserInfo: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    return res.status(200).send('getUserInfo Test');
  },

  modifyUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    return res.status(200).send('modifyUser Test');
  },

  deleteUser: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/user/info?userId=''

    return res.status(200).send('deleteUser Test');
  }
}