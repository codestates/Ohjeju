const {attractions,group,plan,planner,reviews,users,user_group} = require('../models')

module.exports = {
    getAllAttraction: async (req, res) => {
        const findAttractions = await attractions.findAll({

        })
        console.log('att')
        res.status(200).json(findAttractions)
  },
  getThatAttraction: async(req,res) => {
    console.log(req.body.location)
    const findAttractions = await attractions.findOne({
      where:{
        address:req.body.location
      }
    })
    res.status(200).json(findAttractions)
  }
}