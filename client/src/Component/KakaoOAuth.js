import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function KakaoOAuth({setuserInfo, userInfo}) {
    
    const getAuthcode= new URL(window.location.href).searchParams.get('code')
    const getLoginPlatform = new URL(window.location.href).searchParams.get('state')

    const history = useHistory();

    React.useEffect(async() => {
        setKakaoUser();
        getKakaoUser();
    })

    const setKakaoUser = () => {
        axios.post(`${SERVER_URL}/kakao`,{
            code:getAuthcode,
            state:getLoginPlatform
        }).then((res)=>{
            console.log(res.data.kakao_account)
            console.log(res.data.kakao_account.email)
            console.log(res.data.kakao_account.profile.nickname)
            console.log(res.data.kakao_account.profile.profile_image_url)
            
            // history.push('/')
        })
      }
      
    const getKakaoUser = () =>{

    }

    return (
        <div>카카오로그인 로딩창</div>
    )
}

export default KakaoOAuth;