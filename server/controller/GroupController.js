//필요한 모델 require 해와야 함

//그룹 관련 method
module.exports = {
  createGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group

    return res.status(200).send('createGroup Test');
  },

  getGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''

    return res.status(200).send('getGroup Test');
  },

  modifyGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''

    return res.status(200).send('modifyGroup Test');
  },

  deleteGroup: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/group?groupId=''

    return res.status(200).send('deleteGroup Test');
  }
}