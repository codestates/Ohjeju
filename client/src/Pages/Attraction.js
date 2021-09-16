/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../css/Attraction.module.css";
import Footer from "../Component/Footer";
import jeju1 from "../Imgs/jeju1.jpg";

require("dotenv").config();

const Attraction = () => {
  const [starfill, setStarFill] = useState([1, 2, 3, 4, 5]);
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <h1 className={style.leftTitle}>명소 이름</h1>
          <div className={style.leftImage}>
            <div className={style.favoriteImg}>
              <img src={jeju1} className={style.Imgs}></img>
            </div>
          </div>
          <div className={style.favoriteInfo}>
            <div className={style.write}>
              asdfasdfsadfawemfnkawlefklawjefklajwelkfjaklewfjlkawefjklawejfklawejfklawjeflkjawkelfjawekl;fjlkwefjklwefjklwaefjklwaejfklwajfklwaefklawefawefawefwefwaefwaefawf
              asdfasdfsadfawemfnkawlefklawjefklajwelkfjaklewfjlkawefjklawejfklawejfklawjeflkjawkelfjawekl;fjlkwefjklwefjklwaefjklwaejfklwajfklwaefklawefawefawefwefwaefwaefawf
              asdfasdfsadfawemfnkawlefklawjefklajwelkfjaklewfjlkawefjklawejfklawejfklawjeflkjawkelfjawekl;fjlkwefjklwefjklwaefjklwaejfklwajfklwaefklawefawefawefwefwaefwaefawf
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          {starfill.map((item) => {
            return <i class="far fa-star"></i>;
          })}
          <h1 className={style.rightTitle}>Review</h1>
          <div className={style.review}>
            <div className={style.reviewDiv}>Review</div>
          </div>
          <div className={style.reviewInput}>
            <input
              className={style.inputText}
              placeholder="Review here"
            ></input>
            <button className={style.reviewBtn}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attraction;
