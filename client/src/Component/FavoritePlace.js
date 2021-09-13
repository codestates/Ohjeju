import React, { useState } from "react";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import hanra from "../Imgs/hanra.jpg";
import manjang from "../Imgs/manjang.jpg";
import jiyeon from "../Imgs/jiyeon.jpeg";
import axios from "axios";

function FavoritePlace() {
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";

  return (
    <div className="favorite">
      <div className="favorite_title">title</div>
      <div className="product-container">
        <div className="product-item">
          <div classname="black-overlay">
            <div className="overlay"></div>
          </div>
          <img src={seongsan} alt="" className="overlay-img" />
        </div>
      </div>
    </div>
  );
}

export default FavoritePlace;
