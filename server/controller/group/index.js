const {attraction_review,attractions,group,plan,planner,reviews,users,user_group} = require('../../models')

module.exports = {
    get : (req,res) => {
        //query?groupId=''
        console.log('group/get')
    },

    post : (req,res) => {
        console.log('group/post')

    },

    patch : (req,res) => {
        //query?groupId=''
        console.log('group/patch')

    },
    
    delete : (req,res) => {
        //query?groupId=''
        console.log('group/delete')

    }
}