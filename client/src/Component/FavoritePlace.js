/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";

function FavoritePlace() {
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";
  const [favoriteImg, setFavoriteImg] = useState([]);

  const getImage = axios.post("http://localhost:80/attractions").then((res) => {
    let newArray = [...res.data];
    let Imgs = newArray.slice(0, 30);
    return Imgs;
    // Imgs.map((el, index) => {
    //   return <img key={index}>{el.image}</img>;
    // });
    // res.data.map((el, index) => {
    //   <img className="overlay-img" key={index}></img>;
    // });
  });

  console.log(getImage);
  // useEffect(() => {
  //   getImage();
  // }, []);

  return (
    <div className="favorite">
      <div className="favorite_title">title</div>
      <div className="product-container">
        <div className="product-item">
          <div classname="black-overlay">
            <div className="overlay"></div>
          </div>
          {/* <img src={seongsan} alt="" className="overlay-img" /> */}
          {getImage.map}
        </div>
      </div>
    </div>
  );
}

export default FavoritePlace;
