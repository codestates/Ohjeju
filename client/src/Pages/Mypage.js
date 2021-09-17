/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Mypage.css";
import defaultImg from '../Imgs/hanra.jpg'

require("dotenv").config();

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function Mypage({userInfo, getuserInfo, handleuserInfoDestroy}) {
  
  const [showuserInfoModifyModal, setshowuserInfoModifyModal] = useState(false) //유저정보수정모달
  const [showuserInfoDestroyModal, setshowuserInfoDestroyModal] = useState(false) //유저탈퇴모달
  const [userInfoModifyInput, setuserInfoModifyInput] = useState({  //유저정보수정입력구조
    userName:'',
    password:''
  }
  )
  const [errorMessage, seterrorMessage] =useState('')
  
  const closePopup = () => {   //모달닫기
    seterrorMessage('')
    setshowuserInfoModifyModal(false)
    setshowuserInfoDestroyModal(false)
  }

  const userInfoModify = () => { //유저정보수정실행
    if(!userInfoModifyInput.userName || !userInfoModifyInput.password){
      seterrorMessage('닉네임과 비밀번호를 모두 입력해주세요')
    }
    else{
      const payload={
        userName:userInfoModifyInput.userName,
        password:userInfoModifyInput.password
      }
      axios.patch(`${SERVER_URL}/user/info?userId=${userInfo.id}`, payload, { withCredentials: true })
      .then((res)=>{
        getuserInfo(res)
      })
      setuserInfoModifyInput({
        userName:'',
        password:''
      })
      setshowuserInfoModifyModal(false)
    }
  }

  const handleModifyInputValue = (key) => (e) => { //유저정보수정입력
    setuserInfoModifyInput({...userInfoModifyInput, [key]: e.target.value})
  }

  const userInfoDestroy = () => { //회원탈퇴
    axios.delete(`${SERVER_URL}/user/info?userId=${userInfo.id}`, {withCredentials: true})
    .then((res)=>{
      setshowuserInfoDestroyModal(false);
      handleuserInfoDestroy();
    })
  }

  return (
    <div className='mypage_container'>
      <img className='user_image' src={defaultImg}></img>
      <img className='user_image' src={userInfo.image}></img>
      <div className='user_info_container'>
        <div className='user_email'>{userInfo.email}</div>
        <div className='user_username'>{userInfo.userName}</div>
      </div>
      <div className='user_planner'>
        <Link to ='/plannerSelect'>
        <button className='move_to_plannerPage'>플래너 페이지 이동버튼</button>
        </Link>
      </div>
      <div className='usermodify_container'>
        <button className='user_info_modify_button' onClick={setshowuserInfoModifyModal}>유저정보 수정버튼</button>
        <button className='user_info_destroy_button' onClick={setshowuserInfoDestroyModal}>유저탈퇴 버튼</button>
      </div>
      {showuserInfoModifyModal? (
                  <div className='popup'>
                      <div className='popup_inner'>
                      <div className='close_popup_container'>
                          <span className='Modal_title'>Oh! Jeju</span>
                          <button className='close_popup_button' onClick={closePopup}>x</button>
                      </div>
                      <div className='user_info_modify_container'>
                        <div className='user_info_modify_input_container'>
                          <input className='user_info_modify_userName' placeholder='유저네임' onChange={handleModifyInputValue('userName')}></input>
                          <input className='user_info_modify_password' placeholder='비밀번호' onChange={handleModifyInputValue('password')}></input>
                        </div>
                        <div className='error_message_container'>
                            {errorMessage!=='' ? (
                              <div className='signup_error_message'>{errorMessage}</div>
                              ):null}
                        </div>
                      </div>
                      <div className='sociallogin_container'>
                        <button className='user_info_modify_confirm' onClick={userInfoModify}>회원정보수정확인</button>
                      </div>
                      </div>
                  </div>
      ):null}
      {showuserInfoDestroyModal? (
                  <div className='popup'>
                      <div className='popup_inner_user_info_destroy'>
                      <div className='close_popup_container'>
                          <span className='Modal_title'>Oh! Jeju</span>
                          <button className='close_popup_button' onClick={closePopup}>x</button>
                      </div>
                      <div className='user_info_destroy_text'>회원탈퇴시 모든 정보가 초기화됩니다</div>
                      <button className='user_info_destroy_confirm' onClick={userInfoDestroy}>회원탈퇴확인버튼</button>
                      </div>
                  </div>
      ):null}
    </div>
  )
}

export default Mypage;
