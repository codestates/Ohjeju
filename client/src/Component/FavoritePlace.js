/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import "../css/FavoritePlace.css";

function FavoritePlace({placeList}) {

  let count = useRef(0);

  const [imgSlide, setImgSlide] = useState({
    transform: "translate(0vw)",
  });

  const slideNextHandler = () => {
    count.current -= 100;
    setImgSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  const slideBeforeHandler = () => {
    count.current += 100;
    setImgSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  return (
    <div className="favorite">
      <div className="favorite_title">플레이스</div>
      <div className="bigContainer">
        {placeList.map((item, index) => {
          return (
            <div className="middleContainer" key={item.id}>
              <div className="iconBefore">
                <i
                  className="fas fa-chevron-circle-left"
                  onClick={slideBeforeHandler}
                ></i>
              </div>
              <div className="iconNext">
                <i
                  className="fas fa-chevron-circle-right"
                  onClick={slideNextHandler}
                ></i>
              </div>
              <div>
                <img src={item.image} className="main-img" style={imgSlide} />
              </div>
              <div className="slideInfo" style={imgSlide}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePlace;
