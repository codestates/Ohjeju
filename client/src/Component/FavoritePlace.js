/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";

function FavoritePlace() {
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";
  const [imgList, setimgList] = useState([]);

  const getImg = () => {
    axios.get('http://localhost:80/attractions')
    .then((res)=>{
      let arr= [...res.data]
      let newarr=arr.slice(0,30)
      setimgList(newarr);
    })
  }

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div className="favorite">
      <div className="favorite_title">title</div>
      <div className="product-container">
        <div className="product-item">
          <div classname="black-overlay">
            <div className="overlay"></div>
          </div>
          {imgList.map((img)=>{
            return(
              <img src={img.image} alt='' className='overlay-img'/>
              )
          })}
        </div>
      </div>
    </div>
  );
}

export default FavoritePlace;
