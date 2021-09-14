import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../css/Signout.css'

const SERVER_URL =process.env.SERVER_URL || 'http://localhost:80';

export default function Signout() {

    const handleLogout = () => {
        console.log('로그아웃')
        
        axios.post(`${SERVER_URL}/signout`).then((res) => {
            
        });
      };

    return (
        <span id='header_SignOut' onClick={handleLogout}>
          로그아웃
        </span>
    )
}