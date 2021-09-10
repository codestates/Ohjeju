const {attraction_review,attractions,group,plan,planner,reviews,users,user_group} = require('../../models')

module.exports = {
    get : (req,res) => {
        //query?planId='' ->추후생각 query를 더붙혀서 몇번째planner에 몇일차 plan을 받아오는식으로
        //plan의 get은 아직 얘기안나온부분이니 넘어가도됨
        console.log('plan/get')
    },

    post : (req,res) => {
        console.log('plan/post')

    },

    patch : (req,res) => {
        //query?planId=''
        console.log('plan/patch')

    },
    
    delete : (req,res) => {
        //query?planId=''
        console.log('plan/delete')

    }
}