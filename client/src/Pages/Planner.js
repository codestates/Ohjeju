/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../Component/KakaoMap";
import Chat from "../Component/Chat";
import style from "../css/Planner.module.css";

require("dotenv").config();

const Planner = ({userInfo,plannerInfo,location}) => { 

  if(location.state===undefined){  //메인페이지에서 비로그인으로 접근
    location.state={
      plannerInfo:{
        id:'게스트플래너아이디',
        name:'게스트플래너',
        group:{
          groupId:'',
          groupName:'',
          leader:'',
          leaderId:'',
          user:[{
            id:'',
            userName:'Guest',
            email:'',
            image:null
          }]
        },
        plan:[]
      },
      userInfo:{
        id:undefined,
        email:'게스트이메일',
        name:'게스트',
        admin:'',
        image:''
      }
    }
  }

  const [userInfoId, setUserInfoId] = useState(location.state.userInfo.id || '게스트아이디');  //로그인 비로그인 구별용상태

  const plan = location.state.plannerInfo.plan
  // group: {groupId: 74, groupName: 'New Group', leader: '최용석', user: Array(1)}
  // id: 77
  // name: "www"
  // plan: {departureTime ,destination, memo, day, plannerId, id} 플랜이 여러개 들어갈수있다

  const [planInfo, setplanInfo] = useState(plan);  //받아온 플랜정보   여러개 들어갈수있다(배열)

  const [planningInfo, setPlanningInfo] = useState({  //작성하고 있는 플랜정보
    departureTime:'Time',
    destination:'Destination',
    memo:'Memo',
    day:'Date',
    plannerId:location.state.plannerInfo.id,  //현재플래너아이디
    // id:'플랜아이디'
  })

  const handleDeparureTime = (key) => (e) => {   //출발시간
    setPlanningInfo({...planningInfo, [key]:e.target.value})
  } 

  const handleDay = (key) => (e) => {    //일차
    setPlanningInfo({...planningInfo, [key]:e.target.value})
  }

  const handleDestination = (e) => {   //도착지
    setPlanningInfo({...planningInfo, destination:e})
  }

  const handelMemo = (key) => (e) => {   //메모
    setPlanningInfo({...planningInfo, [key]:e.target.value})
  }
  
  const addPlan = () => {      //플랜추가
    if(planningInfo.departureTime==='출발시간' || planningInfo.destination==='도착지' || planningInfo.day==='일차'){
      alert('출발시간, 도착지, 일차를 입력해주세요')
    }
    else if(userInfoId==='게스트아이디'){   //비로그인상태
      const payload = planningInfo
      planInfo.push(payload)
      const result = JSON.parse(JSON.stringify(planInfo))
      setplanInfo(result)
      setPlanningInfo({        //작성하고 있는 플랜정보 초기화
        departureTime:'출발시간',
        destination:'도착지',
        memo:'메모',
        day:'일차',
        plannerId:location.state.plannerInfo.id,  //현재플래너아이디
      })
    }
    else if(userInfoId!=='게스트아이디'){   //로그인상태
      const payload = planningInfo
      axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/plan`, payload, {withCredentials:true})
      .then((res)=>{
        planInfo.push(payload)
        const result = JSON.parse(JSON.stringify(planInfo))
        setplanInfo(result)
        setPlanningInfo({        //작성하고 있는 플랜정보 초기화
          departureTime:'출발시간',
          destination:'도착지',
          memo:'메모',
          day:'일차',
          plannerId:location.state.plannerInfo.id,  //현재플래너아이디
        })
      })
      .catch((err)=>{
        alert(err.message)
      })
    }
  }
  
  const deletePlan = (idx) => {    //플랜삭제
    if(userInfoId==='게스트아이디'){   //비로그인상태
      const planId = planInfo[idx].id
      planInfo.splice(idx,1)
      const result = JSON.parse(JSON.stringify(planInfo))
      setplanInfo(result)
    }
    if(userInfoId!=='게스트아이디'){   //로그인상태
      const planId = planInfo[idx].id
      axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/plan?planId=${planId}`, {withCredentials:true})
      .then((res)=>{
        planInfo.splice(idx,1)
        const result = JSON.parse(JSON.stringify(planInfo))
        setplanInfo(result)
      })
      .catch((err)=>{
        alert(err.message)
      })
    }
  }
  
  const modifyPlan = (idx) => {     //플랜수정
    const payload = {}
    // departureTime | destination | memo   | day 
    axios.patch(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/plan?planId=${planInfo.id}`, payload, {withCredentials:true})
    .then((res)=>{

    })
  }

  const planner1 =  
    <div className='planner1'>
    <div className={style.current_planner_name}>{location.state.plannerInfo.name}</div>
    {userInfoId==='게스트아이디' ? (
      <div className='guest_inform'>
        현재 게스트입니다.<br></br>
        플래너정보가 저장되지 않습니다.<br></br>
        더 많은 기능을 사용하시려면 로그인해주세요
      </div>
    ):null}
    <div className={style.plan_container}>
      <div className={style.planner_day_time_container}>
        <input className={style.planner_day_modify} type="date" onChange={handleDay('day')} />
        <input className={style.planner_time_modify} type="time" onChange={handleDeparureTime('departureTime')} />
      </div>
      <div className={style.planning_container}>
        <div className={style.planning_inform}>{planningInfo.day}</div>
        <div className={style.planning_inform}>{planningInfo.departureTime}</div>
        <div className={style.planning_inform}>{planningInfo.destination}</div>
        <div className={style.planning_inform}><input className={style.planning_memo} onChange={handelMemo('memo')} placeholder='메모입력' /></div>
        {/* <div>작성중인 플랜플래너아이디(개발용): {planningInfo.plannerId}</div> */}
        <button className={style.planning_add_button} onClick={addPlan}>플랜추가</button>
      </div>
    <div>------------------------------------------------------------------------------------------------------</div>
      <div className={style.plan_saved_container}>
      {planInfo.map((plan,idx)=>{
        return (
        <div className={style.plan_saved_el_container}>
        <div className={style.plan_inform}>{plan.day}</div>
        <div className={style.plan_inform}>출발시간 : {plan.departureTime}</div>
        <div className={style.plan_inform}>{plan.destination}</div>
        <div className={style.plan_inform_memo}>{plan.memo}</div>
        <button className={style.plan_delete_button} onClick={()=>deletePlan(idx)}>플랜삭제</button>
        </div>
        )
      })}
      </div>
    </div>
    </div>

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.map}>
          <KakaoMap 
          userInfo={location.state.userInfo}
          plannerInfo={location.state.plannerInfo}
          handleDestination={handleDestination}
          planner1={planner1}
          />
        </div>
        {/* <div className={style.chat}>
          <Chat />
        </div> */}
      </div>
    </div>
  );
};

export default Planner;
