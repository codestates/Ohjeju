import React from "react";
import style from "../css/Test.module.css";
import service from "../Imgs/service.mp4";

const Test = () => {
  return (
    <div className={style.videoBox}>
      <video className={style.videoContainer} autoPlay muted loop>
        <source src={service} type="video/mp4" />
      </video>
    </div>
  );
};

export default Test;
