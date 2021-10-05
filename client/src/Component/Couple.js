import React from "react";
import style from "../css/Couple.module.css";
import couple1 from "../Imgs/couple1.jpeg";
import couple2 from "../Imgs/couple2.jpeg";
import couple3 from "../Imgs/couple3.jpeg";
import couple4 from "../Imgs/couple4.jpeg";
import couple5 from "../Imgs/couple5.jpeg";
import couple6 from "../Imgs/couple6.jpeg";
import couple7 from "../Imgs/couple7.jpeg";

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
            <img src={couple1} className={style.coupleImg} />
          </div>
          <div>
            <img src={couple2} className={style.coupleImg} />
          </div>
          <div>
            <img src={couple3} className={style.coupleImg} />
          </div>
          <div className={style.gridFirst1}>
            <img src={couple5} className={style.coupleImg} />
          </div>
          <div>
            <img src={couple4} className={style.coupleImg} />
          </div>
          <div>
            <img src={couple6} className={style.coupleImg} />
          </div>
          <div>
            <img src={couple7} className={style.coupleImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Couple;
