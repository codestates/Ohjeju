import {React, useContext, useState} from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import axios from "axios";

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function Header({ isOn, toggleHandler, isLogin, handleLogout, getuserInfo}) {

  const [signinInfo, setSigninInfo] = useState({   //로그인정보기입
    email:'',
    password:''
  })
  const [signupInfo, setSignupInfo] = useState({   //회원가입정보기입
      email:'',
      password:'',
      passwordConfirm:''
  })
  const [showSigninModal , setshowSigninModal] = useState(false);  //로그인모달
  const [showSignupModal , setshowSignupModal] = useState(false);  //회원가입모달
  const [errorMessage, seterrorMessage] = useState('');            //에러메세지창

  const closePopup = () => {   //모달닫기
    seterrorMessage('')
    setshowSigninModal(false)
    setshowSignupModal(false)
  }

  const moveToSignup = () => {  //로그인모달에서 회원가입모달로 이동
    setshowSigninModal(false)
    setshowSignupModal(true)
  }

  const handleInputInvalue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });  //로그인정보입력
  };
  const handleInputUpvalue = (key) =>(e) =>{
    setSignupInfo({ ...signupInfo, [key]: e.target.value });  //회원가입정보입력
  }

  const handleLogin = () => {  //로그인실행
    if(!signinInfo.email || !signinInfo.password){
      seterrorMessage('이메일과 비밀번호를 모두 입력해주세요') //이메일 유효성검사도 해야할것같다
    }else{
      const payload= {
        email: signinInfo.email,
        password: signinInfo.password,
      }
      axios.post(`${SERVER_URL}/signin`, payload, { withCredentials: true })
      .then((res)=>{
        getuserInfo(res)
        setshowSigninModal(false)
      })
      .catch((err)=>{
        console.log(err.message)
        if(err.message==="not authorized"){
          alert('이메일과 비밀번호를 확인하세요')
        }
        if(err.message==="server error"){
          alert('서버 에러')
        }
      })
    }
  };

  const handleSignup = () => {  //회원가입실행
    if(!signupInfo.email || !signupInfo.password || !signupInfo.passwordConfirm){
        seterrorMessage('이메일과 비밀번호를 모두 입력하세요')
    }
    else if(signupInfo.password!==signupInfo.passwordConfirm){
        seterrorMessage('비밀번호가 일치하지 않습니다')
    }
    else{
        const payload={
            email:signupInfo.email,
            password:signupInfo.password,
            passwordConfirm:signupInfo.passwordConfirm
        }
        axios.post(`${SERVER_URL}/signup`, payload)
        .then((res)=>{
            alert('가입완료')
            setshowSignupModal(false)
        })
        .catch((err)=>{
          console.log(err.message)
            if(err.message==="Request failed with status code 409"){
                alert('이메일 중복')
            }
            if(err.message==="server error"){
                alert('서버 에러')
            }
        })
    }
}

  return (
    <header>
      <div id="header_in">
        <div id="header_front">
          <Link to="/">
            <span id="header_logo">Oh! Jeju</span>
          </Link>
          <span id="header_toggle">
            <div className="toggle-container">
              <Toggle isOn={isOn} toggleHandler={toggleHandler} />
            </div>
          </span>
        </div>
        <div id="header_back">
          {isLogin===true? (
          <span id='header_SignOut' onClick={handleLogout}>로그아웃</span>
          ):
          <a>
            <span id='header_SignIn' onClick={setshowSigninModal}>로그인</span>
            <span id='header_SignUp' onClick={setshowSignupModal}>회원가입</span>
            {showSigninModal ? (
              <div className='popup'>
                <div className='popup_inner'>
                  <button className='close_popup_button' onClick={closePopup}>팝업닫기</button>
                  <div className='login_container'>
                    <div className='web_container'>
                      <input className='email_input' placeholder='이메일입력' onChange={handleInputInvalue('email')}></input>
                      <input className='password_input' placeholder='패스워드입력' onChange={handleInputInvalue('password')}></input>
                      <div className='error_message'>{errorMessage}</div>
                      <div className='web_button_container'>
                        <button className='weblogin_button' onClick={handleLogin}>로그인버튼</button>
                        <button className='websignup_button' onClick={moveToSignup}>회원가입버튼</button>
                      </div>
                      <div className='reCAPTCHA'>reCAPTCHA</div>
                    </div>
                    <div className='sociallogin_container'>
                      <button className='kakao_login_button'>카카오</button>
                      <button className='google_login_button'>구글</button>
                    </div>
                  </div>
                </div>
              </div>
            ):null}
            {showSignupModal? (
                  <div className='popup'>
                      <div className='popup_inner'>
                          <button className='close_popup_button' onClick={closePopup}>팝업닫기</button>
                          <div className='signup_container'>
                              <input className='email_input' placeholder='이메일' onChange={handleInputUpvalue('email')}></input>
                              <input className='password_input' placeholder='비밀번호' onChange={handleInputUpvalue('password')}></input>
                              <input className='password_confirm_input' placeholder='비밀번호확인' onChange={handleInputUpvalue('passwordConfirm')}></input>
                              <div className='error_message'>{errorMessage}</div>
                              <button className='signup_button' onClick={handleSignup}>회원가입버튼</button>
                          </div>
                      </div>
                  </div>
            ):null}
          </a>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
