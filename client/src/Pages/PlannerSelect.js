/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlannerSelect.css";

require("dotenv").config();

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function PlannerSelect({userInfo, isLogin}){

  const [plannerList, setplannerList] = useState([{  //모든 플래너 리스트
    id:16,name:"테스트플래너1"
  },{
    id:17,name:"테스트플래너2"
  },{
    id:18,name:"테스트플래너3"
  }])

  const [plannerInfo, setplannerInfo] = useState([{  //플래너각각의 정보리스트
    plan:[{id:1,day:3,departureTime:1530,destination:'목적지',memo:'메모',activityContent:'활동내용'}],
    group: {groupId:1,userName:[]},
    name:'테스트이름',
   }])

  const [plannerName, setplannerName] = useState('') //플래너생성이름

  const [overplannerInfo, setoverplannerInfo] =useState('')

  const getPlanner = () => {        //플래너 불러오기
    axios.get(`${SERVER_URL}/user/planner?userId=${userInfo.id}`, {withCredentials:true})
    .then((res)=>{
      setplannerList(res.data)
    })
  }

  const getPlannerInfo = (idx) => {     //플래너정보 불러오기
    const plannerId=plannerList[idx].id
    axios.get(`${SERVER_URL}/planner?plannerId=${plannerId}`)
    .then((res)=>{
      setplannerInfo(res.data)
      console.log(plannerInfo)
    })
  }

  const movetoPlanner = (idx) => {   //해당플래너로 이동
    const plannerId=plannerList[idx].id
    getPlannerInfo(plannerId)
    console.log(plannerInfo)
      // {
      //   plan:[{id,day,departureTime,destination,memo,activityContent}],
      //   group: {groupId,userName:[]},
      //   name: plannerName
      //  }

      //세팅한 plannerInfo로 Planner페이지로 이동해야한다

    localStorage.setItem('planner', JSON.stringify(plannerInfo));
    // const plannerInfo=JSON.parse(localStorage.getItem('plannerInfo')); 플래너페이지에서 이 코드를 실행하면 해당정보를 갱신한다
  }

  const handleInputvalue = (e) => {      //플래너이름 입력
    setplannerName(e.target.value);
  };

  const modifyPlanner = () => {          //플래너이름변경

  }

  const createPlanner = () => {           //플래너생성
    axios.post(`${SERVER_URL}/planner`, {isLogin:isLogin, name:plannerName}, {withCredentials:true})
    .then((res)=>{
      alert('생성완료')
      setplannerName('')
      getPlanner();
    })
    .catch((err)=>{
      alert('플래너이름을 입력해주세요')
    })
  }

  const deletePlanner = (idx) => {    //플래너삭제
    const plannerId=plannerList[idx].id
    axios.delete(`${SERVER_URL}/planner?plannerId=${plannerId}`, {withCredentials:true})
    .then((res)=>{
      alert('삭제완료')
      getPlanner();
    })
    .catch((err)=>{
      alert(`플레너삭제에러:${err.message}`)
    })
  }

  useEffect(() => {
    getPlanner();
  }, []);
  
  
  

  return (
    <div className='planner_container'>
      {plannerList.map((planner, idx)=>{
        return (
          <div className='planner_item' onMouseOver={()=>getPlannerInfo(idx)}>
            <button className='planner_item_delete' onClick={()=>deletePlanner(idx)}>x</button>
            <div className='planner_item_info'>
              {planner.name}
              {plannerInfo.name}
            </div>
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
