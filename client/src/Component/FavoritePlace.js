import React, { useState } from "react";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import hanra from "../Imgs/hanra.jpg";
import manjang from "../Imgs/manjang.jpg";
import jiyeon from "../Imgs/jiyeon.jpeg";

function FavoritePlace() {
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
        <div className="product-item">
          <img src={manjang} alt="" />
        </div>
        <div className="product-item">
          <img src={hanra} alt="" />
        </div>
        <div className="product-item">
          <img src={jiyeon} alt="" />
        </div>
        <div className="product-item">
          <img src={jiyeon} alt="" />
        </div>
        <div className="product-item">
          <img src={jiyeon} alt="" />
        </div>
        <div className="product-item">
          <img src={jiyeon} alt="" />
        </div>
        <div className="product-item">
          <img src={jiyeon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default FavoritePlace;
