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
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.map}>
          <KakaoMap />
        </div>
        <div className={style.chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Planner;
