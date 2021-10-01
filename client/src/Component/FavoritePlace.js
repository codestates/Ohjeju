/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import "../css/FavoritePlace.css";
import seongsan from "../Imgs/seongsan.jpg";
import axios from "axios";
import logo1 from "../Imgs/logo1.png";
import logo2 from "../Imgs/logo2.png";
import logo3 from "../Imgs/logo3.png";

function FavoritePlace({ getPlace, placeList, setPlaceList }) {
  console.log(placeList);
  const history = useHistory();
  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";

  const [count, setCount] = useState(-100);
  const [slide, setSlide] = useState({
    transform: `translate(${0}+vw)`,
  });

  const slideNextHandler = () => {
    setSlide({
      transform: `translate(${count}vw)`,
    });
    setCount(count - 100);
  };

  const slideBeforeHandler = () => {};

  return (
    <div className="favorite">
      <div className="favorite_title">추천명소</div>
      <div className="bigContainer">
        {placeList.map((item, index) => {
          return (
            <div className="middleContainer">
              <button className="slideNextBtn" onClick={slideBeforeHandler}>
                before
              </button>
              <div className="container">
                <img src={item.image} className="main-img" style={slide} />
              </div>
              <button className="slideBeforeBtn" onClick={slideNextHandler}>
                next
              </button>
              <div className="slideInfo">{item.info}</div>
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
