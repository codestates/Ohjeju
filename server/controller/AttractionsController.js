const {attractions} = require('../models')

module.exports = {
  getAllAttraction: async (req, res) => {
      const findAttractions = await attractions.findAll({})
      res.status(200).json(findAttractions)
  },
  
  getThatAttraction: async(req,res) => {
    const findAttractions = await attractions.findOne({
      where:{
        address:req.body.location
      }
    })
    res.status(200).json(findAttractions)
  }
}