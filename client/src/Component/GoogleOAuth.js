import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:80';
const GOOGLE_LOGIN_PASSWORD = process.env.GOOGLE_LOGIN_PASSWORD;

function GoogleOAuth({setuserInfo, setisLogin, getuserInfo}){

    const history = useHistory();
    
    useEffect( async () => {
      axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/google`,{
        hash: new URL(window.location.href).hash
      })
      .then((res) => {
        history.push('/');
        axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/signin`, {
          email: res.data.email,
          password: `${process.env.GOOGLE_LOGIN_PASSWORD}`
        }, { withCredentials: true })
        .then((res) => { getuserInfo(res) })
      })
      .catch((err) => { alert(err) })
      // .then((res) => {              //res => 구글유저정보(id, email, picture)
      //     const payload = {
      //       email:res.data.email,
      //       userName:'Google User',
      //       password:'google',
      //       image:res.data.picture
      //     }
      //     axios.post(`${SERVER_URL}/signup`, payload)  //첫 회원가입 시도
      //     .then((res)=>{
      //       setuserInfo({
      //         email:res.data.email,
      //         userName:'Google User',
      //         image:res.data.picture
      //       })
      //       setisLogin(true)
      //       history.push('/')
      //     })
      //     .catch((err)=>{         //이미 존재하는 회원일시 바로 userInfo를 set하고 로그인상태로 만든다
      //       setuserInfo({
      //         email:res.data.email,
      //         userName:'Google User',
      //         image:res.data.picture
      //     })
      //     setisLogin(true)
      //     history.push('/')
      //     })
      // })
      // .catch(e => console.log('oAuth token expired'));
    }, [])

  return (
    <div>구글로그인 로딩창(로딩화면 필요)</div>
  );
}

export default GoogleOAuth;