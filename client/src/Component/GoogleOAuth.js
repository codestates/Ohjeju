import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

const GOOGLE_LOGIN_PASSWORD = process.env.GOOGLE_LOGIN_PASSWORD || 'Z29vZ2xlIGxvZ2luIHBhc3N3b3Jk'

function GoogleOAuth({getuserInfo}){

    const history = useHistory();
    
    useEffect( async () => {
      axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/google`,{
        hash: new URL(window.location.href).hash
      })
      .then((res) => {
        history.push('/');
        axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:80"}/signin`, {
          email: res.data.email,
          password: `${GOOGLE_LOGIN_PASSWORD}`
        }, { withCredentials: true })
        .then((res) => { getuserInfo(res) })
      })
      .catch((err) => { alert(err) })
    }, [])

  return (
    <div>구글로그인 로딩창</div>
  );
}

export default GoogleOAuth;