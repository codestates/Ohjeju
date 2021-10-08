import React, { useState } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import axios from "axios";
import kakao from "../Imgs/kakao_login_large_wide.png";
import google from "../Imgs/btn_google_signin_light_normal_web@2x.png";
import xbutton from "../Imgs/xbutton.png";
import { useHistory } from "react-router";

require("dotenv").config();

const SERVER_URL = process.env.SERVER_URL || "http://localhost:80";

function Header({
  isOn,
  toggleHandler,
  page,
  setPage,
  userInfo,
  isLogin,
  handleLogout,
  getuserInfo,
}) {
  const history = useHistory();

  const [signinInfo, setSigninInfo] = useState({
    //로그인정보기입
    email: "",
    password: "",
  });
  const [signupInfo, setSignupInfo] = useState({
    //회원가입정보기입
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showSigninModal, setshowSigninModal] = useState(false); //로그인모달
  const [showSignupModal, setshowSignupModal] = useState(false); //회원가입모달
  const [errorMessage, seterrorMessage] = useState(""); //에러메세지창

  const pageSet = () => {
    //페이지상태관리
    if (page === "mypage") {
      setPage("");
    } else {
      setPage("mypage");
    }
  };

  const closePopup = () => {
    //모달닫기
    seterrorMessage("");
    setshowSigninModal(false);
    setshowSignupModal(false);
  };

  const moveToSignup = () => {
    //로그인모달에서 회원가입모달로 이동
    seterrorMessage("");
    setshowSigninModal(false);
    setshowSignupModal(true);
  };

  const handleInputInvalue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value }); //로그인정보입력
  };
  const handleInputUpvalue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value }); //회원가입정보입력
  };

  const validateEmail = (email) => {
    //이메일 유효성검사
    var re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  const handleLogin = () => {
    //로그인실행
    if (!signinInfo.email || !signinInfo.password) {
      seterrorMessage("이메일과 비밀번호를 모두 입력해주세요");
    } else {
      seterrorMessage("");
      const payload = {
        email: signinInfo.email,
        password: signinInfo.password,
      }
      //`${process.env.REACT_APP_API_URL || "http://localhost:80"}/signin`
      axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/signin`, payload, { withCredentials: true })
      .then((res)=>{
        getuserInfo(res)
        setSigninInfo({
          email:'',
          password:''
        })
        setshowSigninModal(false)
        history.push('/')
      })
        .catch((err) => {
          console.log(err.message);
          if (err.message === "Request failed with status code 400") {
            //
            alert("이메일과 비밀번호를 확인하세요");
          }
          if (err.message === "Request failed with status code 500") {
            alert("서버 에러");
          }
        });
    }
  };

  const handleSignup = () => {  //회원가입실행
    if(validateEmail(signupInfo.email)===false){
        seterrorMessage('이메일형식이 올바르지 않습니다')
    }
    else if(!signupInfo.email || !signupInfo.password || !signupInfo.passwordConfirm){
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
        axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/signup`, payload)
        .then((res)=>{
            alert('가입완료')
            setSignupInfo({
              email:'',
              password:'',
              passwordConfirm:''
            })
            setshowSignupModal(false)
            history.push('/')
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 409") {
            //이게 정확
            alert("이메일 중복");
          }
        });
    }
  };

  //소셜로그인

const kakaoLogin = () => { //카카오로그인
  const CLIENT_ID = process.env.KAKAO_REST_KEY;  
  
  //여기 process.env는 제대로 안받아와진다 서버는 되는데; 서버쪽에 client_secret이 있으니 상관없을까
  // const REDIRECT_URI =  "http://localhost:3000/OAuth/kakao";
  const REDIRECT_URI =  "https://oh-jeju.link/OAuth/kakao"; 
  // 배포시 변경해야함 카카오dev에서도 변경해야함
  const state = 'kakao'
  const KAKAO_AUTH_URL = 
  `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=https://oh-jeju.ml/OAuth/kakao&state=${state}&response_type=code`;
  window.location.assign(KAKAO_AUTH_URL)
}

const googleLogin = () => { //구글로그인
  const clientId = process.env.GOOGLE_REST_KEY;
  
  // const REDIRECT_URI =  "http://localhost:3000/OAuth/google"; 
  const REDIRECT_URI =  "https://oh-jeju.link/OAuth/google";
  //  배포시 변경해야함
  const GOOGLE_AUTH_URL = 
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_REST_KEY}&response_type=token&redirect_uri=https://oh-jeju.ml/OAuth/google&scope=https://www.googleapis.com/auth/userinfo.email`
  window.location.assign(GOOGLE_AUTH_URL);
}
 
  return (
    <header>
      <div id="header_in">
        <div id="header_front">
          <Link to="/">
            <span id="header_logo">Oh! Jeju</span>
          </Link>
          {/* <span id="header_toggle">
            <div className="toggle-container">
              <Toggle isOn={isOn} toggleHandler={toggleHandler} />
            </div>
          </span> */}
        </div>
        <div id="header_back">
          {isLogin === true ? (
            <a>
              <span id="login_welcome">
                Welcome!&nbsp;&nbsp;{userInfo.userName}님
              </span>
              {page !== "mypage" ? (
                <Link to="/mypage" onClick={pageSet}>
                  <span id="header_Mypage">마이페이지</span>
                </Link>
              ) : (
                <Link to="/" onClick={pageSet}>
                  <span id="header_Main">홈으로</span>
                </Link>
              )}
              <span id="header_SignOut" onClick={handleLogout}>
                로그아웃
              </span>
            </a>
          ) : (
            <a>
              <span id="header_SignIn" onClick={setshowSigninModal}>
                로그인
              </span>
              <span id="header_SignUp" onClick={setshowSignupModal}>
                회원가입
              </span>
              {showSigninModal ? (
                <div className="popup">
                  <div className="popup_inner">
                    <div className="close_popup_container">
                      <span className="Modal_title">Oh! Jeju</span>
                      <img
                        className="close_popup_button"
                        src={xbutton}
                        onClick={closePopup}
                        alt=""
                      ></img>
                    </div>
                    <div className="login_container">
                      <div className="web_container">
                        <div className="input_container">
                          <input
                            className="email_input"
                            placeholder="이메일입력"
                            onChange={handleInputInvalue("email")}
                          ></input>
                          <input
                            className="password_input"
                            type='password'
                            placeholder="패스워드입력"
                            onChange={handleInputInvalue("password")}
                          ></input>
                          {errorMessage !== "" ? (
                            <div className="error_message">{errorMessage}</div>
                          ) : null}
                        </div>
                        <div className="web_button_container">
                          <button
                            className="weblogin_button"
                            onClick={handleLogin}
                          >
                            로그인
                          </button>
                          <button
                            className="websignup_button"
                            onClick={moveToSignup}
                          >
                            회원가입하기
                          </button>
                        </div>
                        {/* <div className='reCAPTCHA_container'>
                       <div className='reCAPTCHA'>reCAPTCHA</div>
                       <img className='reCAPTCHA' src={recap}></img>
                      </div> */}
                      </div>
                      <div className="sociallogin_container">
                        <img
                          className="kakao_login_button"
                          src={kakao}
                          onClick={kakaoLogin}
                          alt=""
                        />
                        <img
                          className="google_login_button"
                          src={google}
                          onClick={googleLogin}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {showSignupModal ? (
                <div className="popup">
                  <div className="popup_inner_signup">
                    <div className="close_popup_container">
                      <span className="Modal_title">Oh! Jeju</span>
                      <img
                        className="close_popup_button"
                        src={xbutton}
                        onClick={closePopup}
                        alt=""
                      ></img>
                    </div>
                    <div className="signup_container">
                      <div className="signup_web_container">
                        <div className="signup_input_container">
                          <input
                            className="signup_email_input"
                            placeholder="이메일"
                            onChange={handleInputUpvalue("email")}
                          ></input>
                          <input
                            className="signup_password_input"
                            type='password'
                            placeholder="비밀번호"
                            onChange={handleInputUpvalue("password")}
                          ></input>
                          <input
                            className="signup_password_confirm_input"
                            type='password'
                            placeholder="비밀번호확인"
                            onChange={handleInputUpvalue("passwordConfirm")}
                          ></input>
                        </div>
                        <div className="error_message_container">
                          {errorMessage !== "" ? (
                            <div className="signup_error_message">
                              {errorMessage}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="sociallogin_container">
                        <button
                          className="signup_button"
                          onClick={handleSignup}
                        >
                          회원가입
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
