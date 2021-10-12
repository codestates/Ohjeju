/* eslint-disable */
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../css/PlannerSelect.css";

require("dotenv").config();

function PlannerSelect({userInfo, isLogin}){

  //빈배열이라 에러뜨면 밑에 map부분 if로분기
  const [plannerList, setplannerList] = useState([])
  const [plannerInfo, setplannerInfo] = useState([{  //플래너각각의 정보리스트
    plan:[{id:1,day:3,departureTime:1530,destination:'목적지',memo:'메모',activityContent:'활동내용'}],
    group: {groupId:1,userName:[],leader:'리더'},
    name:'테스트이름',
   }])


  const [plannerName, setplannerName] = useState('') //플래너생성이름

  const mouseOn = (idx) => {  //마우스오버시 플래너정보불러오기 및 표시
    getPlannerInfo(idx)
    const element = document.getElementsByClassName(`planner_item_info_info${idx}`)
    element[0].classList.toggle("open")
  }

  const mouseOut = (idx) => {   //마우스아웃시 플래너정보 비표시
    setplannerInfo('')
    const element = document.getElementsByClassName(`planner_item_info_info${idx}`)
    element[0].classList.remove('open')
    element[0].classList.add('close')
  }
 
  const getPlanner = () => {        //플래너 불러오기
    axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/user/planner?userId=${userInfo.id}`, {withCredentials:true})
    .then((res)=>{
      res.data.forEach(item => {
        if(!plannerList.includes(item))  plannerList.push(item)
      })
      const result = JSON.parse(JSON.stringify(plannerList))
      setplannerList(result)
    })
  }

  const getPlannerInfo = (idx) => {     //플래너정보 불러오기
    const plannerId=plannerList[idx].id
    axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/planner?plannerId=${plannerId}`)
    .then((res)=>{
      setplannerInfo(res.data)
    })
  }

  const handleInputvalue = (e) => {      //플래너이름 입력
    setplannerName(e.target.value);
  };

  const modifyPlanner = () => {          //플래너이름변경

  }

  const createPlanner = () => {           //플래너생성
    axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/planner`, {isLogin:isLogin, name:plannerName}, {withCredentials:true})
    .then((res)=>{
      alert('생성완료')
      setplannerName('')
      plannerList.push(res.data)
      const result = JSON.parse(JSON.stringify(plannerList))
      setplannerList(result)
    })
    .catch((err)=>{
      alert('플래너이름을 입력해주세요')
    })
  }

  const deletePlanner = (idx) => {    //플래너삭제
    const plannerId=plannerList[idx].id
    axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/planner?plannerId=${plannerId}`, {withCredentials:true})
    .then((res)=>{
      alert('삭제완료')
      plannerList.splice(idx,1)
      const result = JSON.parse(JSON.stringify(plannerList))
      setplannerList(result)
    })
    .catch((err)=>{
      alert(`리더 외의 멤버는 삭제할 수 없습니다.`)
    })
  }

  useEffect(() => {
    getPlanner();
  }, []);
  
  return (
    <div className='planner_container'>
      {plannerList.map((planner, idx)=>{
        return (
          <div key={idx} className='planner_item' onMouseEnter={()=>mouseOn(idx)} onMouseLeave={()=>mouseOut(idx)}>
            <button className='planner_item_delete' onClick={()=>deletePlanner(idx)}>x</button>
            <div className='planner_item_info'>
              Planner{idx+1}
                <div>
                <div className={`planner_item_info_info${idx} close`}>
                  {planner.name}<br></br>
                  {plannerInfo.group ? (
                    <div>Leader : {plannerInfo.group.leader}</div>
                  ):null}
                  <Link to ={
                    {
                      pathname:'/planner',
                      state:{userInfo,plannerInfo}
                    }
                  }>
                  <button className='planner_item_move'>플래너이동</button>
                  </Link>
                </div>
                </div>
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
