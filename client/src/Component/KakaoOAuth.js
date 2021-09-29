import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:80';
const KAKAO_LOGIN_PASSWORD = process.env.KAKAO_LOGIN_PASSWROD || 'a2FrYW9Mb2dpblBhc3N3b3Jk'

function KakaoOAuth({setuserInfo, setisLogin, getuserInfo}) {

    const history = useHistory();

    useEffect( async () => {
      axios.post(`${SERVER_URL}/OAuth/kakao`, { //인가코드첨부 => 토큰을 요청한다
        code:new URL(window.location.href).searchParams.get('code'),
        state:new URL(window.location.href).searchParams.get('state')
      })
      .then((res) => {
        history.push('/');
        axios.post(`${SERVER_URL}/signin`, {
          email: res.data.email,
          password: KAKAO_LOGIN_PASSWORD
        }, { withCredentials: true })
        .then((res) => { getuserInfo(res) })
      })
      .catch((err) => { alert(err) })
    }, [])
    
    return (
        <div>카카오로그인 로딩창(로딩화면 필요)</div>
    );
   }

export default KakaoOAuth;