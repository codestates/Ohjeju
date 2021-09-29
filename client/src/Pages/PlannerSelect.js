/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlannerSelect.css";

require("dotenv").config();

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function PlannerSelect({userInfo}){

  const [plannerList, setplannerList] = useState([{
    plan:[{id:1,day:3,departureTime:1530,destination:'목적지',memo:'메모',activityContent:'활동내용'}],
    group: {groupId:1,userName:[]},
    name:'테스트플래너1',
   },{
    plan: 1,
    group: 1,
    name:'테스트플래너2',
   },{
    plan:1,
    group: 1,
    name:'테스트플래너3',
   },{
    plan:1,
    group: 1,
    name:'테스트플래너4',
    }])

  const getPlanner = () => {
    axios.get(`${SERVER_URL}/planner?plannerId=${userInfo.plannerId}`)
    .then((res)=>{
      console.log(res.data)
      setplannerList([res.data])
    })
  }

  useEffect(() => {
    getPlanner();
  }, []);

  return (
    <div className='planner_container'>
      {plannerList.map((planner, idx)=>{
        return (
          <Link to='/planner'>
          <div className='planner_item'>
            {planner.name}
          </div>
          <button className='planner_create'>
            플래너생성
          </button>
          </Link>
        )
      })}
    </div>
    
  )
  
};

export default PlannerSelect;
