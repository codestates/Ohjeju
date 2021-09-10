//필요한 모델 require 해와야 함

//플랜 관련 method
module.exports = {
  addPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan

    return res.status(200).send('addPlan Test');
  },

  modifyPlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''

    return res.status(200).send('modifyPlan Test');
  },

  deletePlan: async (req, res) => {
    //* endpoint: https://www.Ohjeju.com/plan?planId=''

    return res.status(200).send('deletePlan Test');
  }
}