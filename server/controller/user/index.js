const {attraction_review,attractions,group,plan,planner,reviews,users,user_group} = require('../../models')

module.exports = {
    get : (req,res) => {
        //
        //query?userId=''
        console.log('user/info/get')
    },

    patch : (req,res) => {
        //query?userId=''
        console.log('user/info/patch')
    },
    
    delete : (req,res) => {
        //query?userId=''
        console.log('user/info/delete')
    }
}