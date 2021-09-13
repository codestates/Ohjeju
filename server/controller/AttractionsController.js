const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')

module.exports = {
    getAttraction: async (req, res) => {
        const findAttractions = await attractions.findAll({

        })

        res.status(200).json(findAttractions)
  }
}