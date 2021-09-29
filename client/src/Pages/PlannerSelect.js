/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlannerSelect.css";

require("dotenv").config();

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function PlannerSelect({userInfo, isLogin}){

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

  const [plannerName, setplannerName] = useState('플래너이름')

  const getPlanner = () => {        //플래너불러오기
    axios.get(`${SERVER_URL}/planner?plannerId=${userInfo.plannerId}`)
    .then((res)=>{
      setplannerList([res.data])
    })
  }

  const handleInputvalue = (e) => {      //플래너이름 입력
    setplannerName(e.target.value);
  };

  const createPlanner = () => {           //플래너생성
    axios.post(`${SERVER_URL}/planner`, {isLogin:isLogin, name:plannerName}, {withCredentials:true})
    .then((res)=>{
      console.log(res.data) //{plannerId}
      setplannerName('')
    })
  }

  useEffect(() => {
    getPlanner();
  }, []);

  return (
    <div className='planner_container'>
      {plannerList.map((planner, idx)=>{
        return (
          <div className='planner_item'>
            {planner.name}
          </div>
        )
      })}
      <div className='planner_create'>
        <input className='planner_create_input' onChange={handleInputvalue} value={plannerName} placeholder='새로운 플래너를 생성해보세요'></input>
        <button className='planner_create_button' onClick={createPlanner}>
          플래너생성
        </button>
      </div>
    </div>
  )
  
};

export default PlannerSelect;
