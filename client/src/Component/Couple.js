import React from "react";
import style from "../css/Couple.module.css";

const Couple = ({ getPlace, placeList }) => {
  // console.log(placeList);

  // let arr = [...placeList];
  // let newarr = arr.slice(100, 200);
  // console.log(newarr);

  return (
    <div className={style.container}>
      <div className={style.boxContainer}>
        <div className={style.imgBox}>
          <div className={style.gridFirst}>
            <img className={style.coupleImg} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Couple;
