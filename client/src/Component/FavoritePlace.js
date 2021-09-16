/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory,RouteComponentProps } from "react-router-dom";
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
              <Link to ={{
                pathname:`/attraction`,
                state:{
                  info : item.info,
                  image: item.image,
                  name: item.name
                }
              }}>
              <img
                src={item.image}
                alt=""
                key={index}
              />
              </Link>
              <div className="product-div">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePlace;
