import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function KakaoOAuth({setuserInfo, setisLogin}) {

    const history = useHistory();

    useEffect( async () => {
      axios.post(`${SERVER_URL}/kakao`,{ //인가코드첨부 => 토큰을 요청한다
        code:new URL(window.location.href).searchParams.get('code'),
        state:new URL(window.location.href).searchParams.get('state')
      }).then((res)=>{
        const payload = {
            email:res.data.kakao_account.email,  // 동의했을시 받아온다
            userName:res.data.kakao_account.profile.nickname,
            password:'kakao',   //더미패스워드
            image:res.data.kakao_account.profile.profile_image_url
        }
        axios.post(`${SERVER_URL}/signup`, payload) //회원가입부터요청한다
        .then((res)=>{
            setuserInfo({
                 email:res.data.kakao_account.email, // 동의했을시 userInfo set
                 userName:res.data.kakao_account.profile.nickname,
                image:res.data.kakao_account.profile.profile_image_url
            })
            setisLogin(true)
            history.push('/')
        })
        .catch((err)=>{
            setuserInfo({   //이미 가입된 계정일경우 바로 유저정보를 바로 set한다
                email:res.data.kakao_account.email,
                userName:res.data.kakao_account.profile.nickname,
                image:res.data.kakao_account.profile.profile_image_url
            })
            setisLogin(true)
            history.push('/')
        })
       }).catch(e => console.log('카카오로그인 에러'))
    }, [])
    
    return (
        <div>카카오로그인 로딩창(로딩화면 필요)</div>
    );
   }

export default KakaoOAuth;