/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import style from "../css/Attraction.module.css";
import Footer from "../Component/Footer";

require("dotenv").config();
const Attraction = ({match,location,history}) => {
  // const history = useHistory();
  const [placeList, setPlaceList] = useState([]);
  const [starfill, setStarFill] = useState([1, 2, 3, 4, 5]);
  console.log('!@#!@#@!@!#!@')
  console.log(location)
  



  useEffect(() => {
  }, []);



  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <h1 className={style.leftTitle}>{location.state.name}</h1>
          <div className={style.leftImage}>
            <div className={style.favoriteImg}>
              <img src={location.state.image} className={style.Imgs}></img>
            </div>
          </div>
          <div className={style.favoriteInfo}>
            <div className={style.write}>
              {location.state.info}
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
        <div className={style.rightContainer}>Review</div>
      </div>
    </div>
  );
};

export default Attraction;
