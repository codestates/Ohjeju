/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";

function FavoritePlace({ getPlace, placeList }) {
  const history = useHistory();

  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";

  return (
    <div className="favorite">
      <div className="favorite_title">title</div>
      <div className="product-container">
        {placeList.map((item, index) => {
          return (
            <div className="product-item">
              <img
                src={item.image}
                alt=""
                key={index}
                onClick={() => {
                  history.push("/attraction");
                }}
              />
              <div className="product-div">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePlace;
