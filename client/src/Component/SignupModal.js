/* eslint-disable */
import { React, useState } from "react";
import axios from "axios";
import "../css/SignupModal.css";

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

export default function SignupModal() {

    const [signupInfo, setSignupInfo] = useState({
        email:'',
        password:'',
        passwordConfirm:''
      })
    const [showSignupModal , setshowSignupModal] = useState(false);
    const [errorMessage, seterrorMessage] = useState('에러메세지 테스트')

    const closePopup = () => {
        seterrorMessage('에러메세지 테스트')
        setshowSignupModal(false)
      }

    const handleInputvalue = (key) => (e) => {
        setSignupInfo({ ...signupInfo, [key]: e.target.value });
      };

    const handleSignup = () => {
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
                if(err.message==="this email already exists"){
                    alert('이메일 중복')
                }
                if(err.message==="server error"){
                    alert('서버 에러')
                }
            })
        }
    }


    return (
        <signup>
        <span id='header_SignUp' onClick={setshowSignupModal}>
          회원가입
        </span>
        {showSignupModal? (
            <div className='popup'>
                <div className='popup_inner'>
                    <button className='close_popup_button' onClick={closePopup}>팝업닫기</button>
                    <div className='signup_container'>
                        <input className='email_input' placeholder='이메일' onChange={handleInputvalue('email')}></input>
                        <input className='password_input' placeholder='비밀번호' onChange={handleInputvalue('password')}></input>
                        <input className='password_confirm_input' placeholder='비밀번호확인' onChange={handleInputvalue('passwordConfirm')}></input>
                        <div className='error_message'>{errorMessage}</div>
                        <button className='signup_button' onClick={handleSignup}>회원가입버튼</button>
                    </div>
                </div>
            </div>
        ):null}
        </signup>
      )
}
