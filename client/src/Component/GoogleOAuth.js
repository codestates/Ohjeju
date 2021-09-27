import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

export default function GoogleOAuth({setuserInfo, setisLogin}){

    const history = useHistory();
    
    useEffect( async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
        headers: { 
          authorization: `token ${accessToken}`, 
          accept: 'application/json' 
        }})
        .then(res => {
            setuserInfo({
                email:res.data.email,
                userName:'Google User',
                image:res.data.picture
            })
            setisLogin(true)
            history.push('/')
      }).catch(e => console.log('oAuth token expired'));
    }
  }, [])

  return (
    <div>구글로그인 로딩창(로딩화면 필요)</div>
  );
}