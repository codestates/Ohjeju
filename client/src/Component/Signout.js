import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signout.css'
import { Redirect } from 'react-router';

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

export default function Signout() {

    const [userInfo, setuserInfo] = useState('') //
    const [isLogin, setisLogin] =useState(false); //

    const handleLogout = () => {
        console.log('로그아웃')
        axios.post(`${SERVER_URL}/signout`).then((res) => {
            setuserInfo(null)
            setisLogin(false);
        });
      };

    return (
        <span id='header_SignOut' onClick={handleLogout}>
          로그아웃
        </span>
    )
}