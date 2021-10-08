/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";
import logo1 from "../Imgs/logo1.png";
import logo2 from "../Imgs/logo2.png";
import logo3 from "../Imgs/logo3.png";

function FavoritePlace({ getPlace, placeList, setPlaceList }) {
  // console.log(placeList);
  const history = useHistory();
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";

  let count = useRef(0);

  // const [count, setCount] = useState(-100);
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

  // console.log(imgSlide);

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
              {/* <div className="container"> */}
              <div>
                <img src={item.image} className="main-img" style={imgSlide} />
              </div>
              <div className="slideInfo" style={imgSlide}>
                {item.name}
              </div>
            </div>

            // <div className="product-item">

            //   >
            //     <div className="product-all">
            //       <img src={item.image} alt="" key={index} />
            //       <p className="product-p">{item.name}</p>
            //     </div>
            //   </Link>
            //   {/* <div className="product-div">{item.info}</div> */}
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePlace;
