/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import "../css/Mypage.css";
import defaultImg from '../Imgs/hanra.jpg'
import xbutton from '../Imgs/xbutton.png'

require("dotenv").config();

function Mypage({userInfo, getuserInfo, handleuserInfoDestroy}) {

  const history=useHistory();

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
      seterrorMessage('모든사항을 입력해주세요')
    }
    else{
      const payload={
        userName:userInfoModifyInput.userName,
        password:userInfoModifyInput.password
      }
      axios.patch(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/user/info?userId=${userInfo.id}`, payload, { withCredentials: true })
      .then((res)=>{
        getuserInfo(res)
        setuserInfoModifyInput({
          userName:'',
          password:''
        })
        alert('변경완료')
        setshowuserInfoModifyModal(false)
      })
      .catch((err)=>{
        alert('소셜로그인은 유저정보수정이 불가합니다')
      })
     }
  }

  const handleModifyInputValue = (key) => (e) => { //유저정보수정입력
    setuserInfoModifyInput({...userInfoModifyInput, [key]: e.target.value})
  }

  const userInfoDestroy = () => { //회원탈퇴
    axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/user/info?userId=${userInfo.id}`, {withCredentials: true})
    .then((res)=>{
      setshowuserInfoDestroyModal(false);
      handleuserInfoDestroy();
      history.push('/')
    })
    .catch((err)=>{
      alert('소셜로그인은 해당기기에서 연결해제해주세요')
    })
  }

  return (
      <div className='mypage_container'>
      {userInfo.image ? 
      (<img className='user_image' src={userInfo.image}/>):
      (<img className='user_image' src={defaultImg}/>)}
      <div className='user_container'>
        <div className='user_info_container'>
          <div className='user_email_container'>
            <div className='user_email'>{userInfo.email}</div>
          </div>
          <div className='user_username_container'>
            <div className='user_username'>{userInfo.userName}</div>
          </div>
        </div>
        <div className='user_planner_move'>
          <Link to ='/plannerSelect'>
          <button className='move_to_plannerPage'>My 플래너</button>
          </Link>
        </div>
      </div>
      <div className='user_info_modify_destroy_container'>
        <button className='user_info_modify_button' onClick={setshowuserInfoModifyModal}>회원정보 수정</button>
        <button className='user_info_destroy_button' onClick={setshowuserInfoDestroyModal}>회원탈퇴</button>
      </div>
      
      {showuserInfoModifyModal? (
                  <div className='popup'>
                      <div className='popup_inner_mypage'>
                      <div className='close_popup_container'>
                          <span className='Modal_title'>Oh! Jeju</span>
                          <img className='close_popup_button' src={xbutton}onClick={closePopup}></img>
                      </div>
                      <div className='user_info_modify_container'>
                        <div className='user_info_modify_input_container'>
                          <input className='user_info_modify_userName' placeholder='닉네임' onChange={handleModifyInputValue('userName')}></input>
                          <input className='user_info_modify_password' type='password' placeholder='비밀번호' onChange={handleModifyInputValue('password')}></input>
                        </div>
                        <div className='error_message_container'>
                            {errorMessage!=='' ? (
                              <div className='modify_error_message'>{errorMessage}</div>
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
                          <img className='close_popup_button' src={xbutton} onClick={closePopup}></img>
                      </div>
                      <div className='user_info_destroy_container'>
                        <div className='user_info_destroy_text'>회원탈퇴시 모든 정보가 초기화됩니다</div>
                        <button className='user_info_destroy_confirm' onClick={userInfoDestroy}>회원탈퇴확인</button>
                      </div>
                      </div>
                  </div>
      ):null}
    </div>
  )
}

export default Mypage;
