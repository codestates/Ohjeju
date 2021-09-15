/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";

function FavoritePlace() {
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";
  const [placeList, setPlaceList] = useState([]);

  const getPlace = () => {
    axios.get("http://localhost:80/attractions").then((res) => {
      console.log(res.data[0].info);
      let arr = [...res.data];
      let newarr = arr.slice(0, 27);
      setPlaceList(newarr);
    });
  };

  useEffect(() => {
    getPlace();
  }, []);

  return (
    <div className="favorite">
      <div className="favorite_title">title</div>
      <div className="product-container">
        {placeList.map((item, index) => {
          return <img src={item.image} alt="" className="product-item" />;
        })}
      </div>
    </div>
  );
}

export default FavoritePlace;
