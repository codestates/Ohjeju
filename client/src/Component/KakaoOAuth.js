import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

function KakaoOAuth({setuserInfo, setisLogin}) {
    
    const getAuthcode= new URL(window.location.href).searchParams.get('code')
    const getLoginPlatform = new URL(window.location.href).searchParams.get('state')

    const history = useHistory();

    React.useEffect(async() => {
        setKakaoUser();
    })

    const setKakaoUser = () => {
        axios.post(`${SERVER_URL}/kakao`,{ //인가코드첨부 => 토큰을 요청한다
            code:getAuthcode,
            state:getLoginPlatform
        }).then((res)=>{
            const payload = {
                email:res.data.kakao_account.email,  //실제로 받아오지못한다 처음가입시 필수정보에 없기때문에
                userName:res.data.kakao_account.profile.nickname,
                password:'kakao',   //더미
                image:res.data.kakao_account.profile.profile_image_url
            }
            axios.post(`${SERVER_URL}/signup`, payload) //회원가입부터요청한다
            .then((res)=>{
                setuserInfo({
                    email:res.data.kakao_account.email, //이것도 더미다 결국
                    userName:res.data.kakao_account.profile.nickname,
                    image:res.data.kakao_account.profile.profile_image_url
                })
                setisLogin(true)
                history.push('/') //window.location.replace('/')로 하면 로그인상태가 해제된다 왜일까
            })
            .catch((err)=>{
                console.log('이미 가입된 계정, 바로 setuserInfo로 넘어간다') //signup요청에 email이 없어서 그런지 카카오로 signup이 안된다
            })
            setuserInfo({                        //이미 가입된 계정일경우 바로 유저정보를 바로 set한다
                email:res.data.kakao_account.email,
                userName:res.data.kakao_account.profile.nickname,
                image:res.data.kakao_account.profile.profile_image_url
            })
            setisLogin(true)
            history.push('/')
        })
      }

    return (
        <div>카카오로그인 로딩창(로딩화면 필요)</div>
    )
}

export default KakaoOAuth;