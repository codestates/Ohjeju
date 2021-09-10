//필요한 모델 require 해와야 함

//플래너 관련 method
module.exports = {
  createPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner

    return res.status(200).send('createPlanner Test');
  },
  
  getPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''

    return res.status(200).send('getPlanner Test');
  },

  modifyPlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''

    return res.status(200).send('modifyPlanner Test');
  },

  deletePlanner: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/planner?plannerId=''

    return res.status(200).send('deletePlanner Test');
  }
}