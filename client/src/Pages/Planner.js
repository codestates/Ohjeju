/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../Component/KakaoMap";
import Chat from "../Component/Chat";
import style from "../css/Planner.module.css";

import "../css/Planner.module.css";


require("dotenv").config();

const Planner = ({userInfo,plannerInfo,location}) => { 

  console.log(plannerInfo)
  // group: {groupId: 74, groupName: 'New Group', leader: '최용석', user: Array(1)}
  // id: 77
  // name: "www"
  // plan: {departureTime ,destination, memo, day, plannerId} 플랜이 여러개 들어갈수있다

  const [planInfo, setplanInfo] = useState({  //플랜정보   여러개 들어갈수있다
    departureTime:'출발시간',
    destination:'도착지',
    memo:'메모',
    day:'일차',
    plannerId:''
  })

  const handleDeparureTime = (key) => (e) => {   //출발시간
    setplanInfo({...planInfo, [key]:e.target.value})
  } 

  const handleDay = (key) => (e) => {    //일차
    setplanInfo({...planInfo, [key]:e.target.value})
  }

  const handleDestination = (destination) => {   //도착지
    setplanInfo({...planInfo, [destination]:destination})
  }

  //플랜추가

  const addPlan = () => {
    
  }

  //플랜삭제

  //플랜수정

  //플랜그룹수정

  
  return (
    <div className={style.container}>
      <input type="date" onChange={handleDay('day')}></input>
      <input type="time" onChange={handleDeparureTime('departureTime')}></input>
      <div>{planInfo.day}</div>
      <div>{planInfo.departureTime}</div>
      <div>{planInfo.destination}</div>
      <div className={style.main}>
        <div className={style.map}>
          <KakaoMap 
          userInfo={location.state.userInfo} 
          plannerInfo={location.state.plannerInfo}
          handleDestination={handleDestination}/>
        </div>
        {/* <div className={style.chat}>
          <Chat />
        </div> */}
      </div>
    </div>
  );
};

export default Planner;
