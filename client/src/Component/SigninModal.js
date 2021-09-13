import React, { useState } from 'react';
import axios from 'axios';
import '../css/SigninModal.css'
import SignupModal from './SignupModal';
import { Redirect } from 'react-router';

const SERVER_URL =process.env.SERVER_URL || 'https://localhost:80';

export default function SigninModal() {

    const [signinInfo, setSigninInfo] = useState({
        email:'',
        password:''
      })
    const [userInfo, setuserInfo] = useState('');
    const [isLogin, setisLogin] = useState(false);
    const [showSigninModal , setshowSigninModal] = useState(false);
    const [showSignupModal , setshowSignupModal] = useState(false);
    const [errorMessage, seterrorMessage] = useState('에러메세지 테스트');

    const closePopup = () => {
      seterrorMessage('에러메세지 테스트')
      setshowSigninModal(false)
    }
    
    const moveToSignup = () => {
      setshowSigninModal(false)
      setshowSignupModal(true)
    }

    const handleInputvalue = (key) => (e) => {
      setSigninInfo({ ...signinInfo, [key]: e.target.value });
    };

    const handleLogin = () => {
      if(!signinInfo.email || !signinInfo.password){
        seterrorMessage('이메일과 비밀번호를 모두 입력해주세요') //이메일 유효성검사도 해야할것같다
      }else{
        const payload= {
          email: signinInfo.email,
          password: signinInfo.password,
        }
        axios.post(`${SERVER_URL}/signin`, payload)
        .then((res)=>{
          axios.get(`${SERVER_URL}/user/info?userId=${res.data.id}`)
          .then((res)=>{
            setuserInfo({
              id:res.data.id,
              email:res.data.email,
              userName:res.data.userName,
              password:res.data.password,
              plannerId:res.data.plannerId,
              admin:res.data.admin,
              image:res.data.image
            })
            setisLogin(true)
          })
        })
      }
    };

    return (
      <signin>
      <span id='header_SignIn' onClick={setshowSigninModal}>
        로그인
      </span>
      {showSigninModal ? (
        <div className='popup'>
          <div className='popup_inner'>
            <button className='close_popup_button' onClick={closePopup}>팝업닫기</button>
            <div className='login_container'>
              <div className='web_container'>
                <input className='email_input' placeholder='이메일입력' onChange={handleInputvalue('email')}></input>
                <input className='password_input' placeholder='패스워드입력' onChange={handleInputvalue('password')}></input>
                <div className='error_message'>{errorMessage}</div>
                <div className='web_button_container'>
                  <button className='weblogin_button' onClick={handleLogin}>로그인</button>
                  <button className='websignup_button' onClick={moveToSignup}>회원가입</button>
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

      
      </signin>
    )
}