/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../Component/KakaoMap";
import Chat from "../Component/Chat";
import style from "../css/Planner.module.css";

import "../css/Planner.module.css";


require("dotenv").config();

const Planner = () => {

  const plannerInfo=JSON.parse(localStorage.getItem('plannerInfo')); //플래너셀렉트페이지에서 저장한 정보

  console.log(`플래너페이지 plannerInfo${plannerInfo.name}`)
  
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.map}>
          <KakaoMap />
        </div>
        {/* <div className={style.chat}>
          <Chat />
        </div> */}
      </div>
    </div>
  );
};

export default Planner;
