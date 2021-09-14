/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Mypage.module.css";
import defaultImg from '../Imgs/hanra.jpg'

require("dotenv").config();

const Mypage = () => {


  return (
    <div className='mypage_container'>
      <img className='user_image' src={defaultImg}></img>
      <div className='user_info_container'>
        <div className='user_email'></div>
        <div className='user_username'></div>
      </div>
      <div className='user_planner'>
        <button className='move_to_plannerPage'>플래너 페이지 이동버튼</button>
      </div>
      <div className='usermodify_container'>
        <button className='user_info_modify_button'></button>
        <button className='user_info_destroy_button'></button>
      </div>
    </div>
  )
  
};

export default Mypage;
