/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../css/Attraction.module.css";
import Footer from "../Component/Footer";

require("dotenv").config();

const Attraction = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <h1>명소 이름</h1>
          <div className={style.favoriteImg}></div>
        </div>
        <div className={style.rightContainer}>Review</div>
      </div>
    </div>
  );
};

export default Attraction;
