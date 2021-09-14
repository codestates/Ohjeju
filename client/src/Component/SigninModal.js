
import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../css/SigninModal.css'
import SignupModal from './SignupModal';

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

export default function SigninModal(setshowSigninModal, showSigninModal, closePopup, handleInputInvalue, errorMessage, handleLogin, moveToSignup, showSignupModal, handleInputUpvalue) {


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
                <input className='email_input' placeholder='이메일입력' onChange={handleInputInvalue('email')}></input>
                <input className='password_input' placeholder='패스워드입력' onChange={handleInputInvalue('password')}></input>
                <div className='error_message'>{errorMessage}</div>
                <div className='web_button_container'>
                  <button className='weblogin_button' onClick={handleLogin}>로그인버튼</button>
                  <button className='websignup_button' onClick={moveToSignup}>회원가입버튼</button>

                </div>
                <div className="reCAPTCHA">reCAPTCHA</div>
              </div>
              <div className="sociallogin_container">
                <button className="kakao_login_button">카카오</button>
                <button className="google_login_button">구글</button>
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
                        <button className='signup_button' >회원가입버튼</button>
                    </div>
                </div>
            </div>
        ):null}
      </signin>
    )
}

