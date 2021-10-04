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
  const [slide, setSlide] = useState({
    transform: "translate(0vw)",
  });

  const slideNextHandler = () => {
    count.current -= 100;
    setSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  const slideBeforeHandler = () => {
    count.current += 100;
    setSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  return (
    <div className="favorite">
      <div className="favorite_title">추천명소</div>
      <div className="bigContainer">
        {placeList.map((item, index) => {
          return (
            <div className="middleContainer">
              <div className="iconBefore">
                <i
                  class="fas fa-chevron-circle-left"
                  onClick={slideBeforeHandler}
                ></i>
              </div>
              <div className="iconNext">
                <i
                  class="fas fa-chevron-circle-right"
                  onClick={slideNextHandler}
                ></i>
              </div>
              {/* 
              <button className="slideBeforeBtn" onClick={slideBeforeHandler}>
                before
              </button> */}
              <div className="container">
                <img src={item.image} className="main-img" style={slide} />
              </div>
              {/* <button className="slideNextBtn" onClick={slideNextHandler}>
                next
              </button> */}
              <div className="slideInfo" style={slide}>
                {item.info}
              </div>
            </div>

            // <div className="product-item">
            //   <Link
            //     to={{
            //       pathname: `/attraction`,
            //       state: {
            //         info: item.info,
            //         image: item.image,
            //         name: item.name,
            //       },
            //     }}
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
