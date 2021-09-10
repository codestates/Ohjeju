const {attraction_review,attractions,group,plan,planner,reviews,users,user_group} = require('../../models')

module.exports = {
    get : (req,res) => {
        //query?plannerId=''
        console.log('planner/get')
    },

    post : (req,res) => {
        console.log('planner/post')

    },

    patch : (req,res) => {
        //query?plannerId=''
        console.log('planner/patch')

    },
    
    delete : (req,res) => {
        //query?plannerId=''
        console.log('planner/delete')

    }
}