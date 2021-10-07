import React from "react";
import style from "../css/Test.module.css";
import bridge from "../Imgs/bridge.mp4";

const Test = () => {
  return (
    <div className={style.videoBox}>
      <video className={style.videoContainer} autoPlay muted loop>
        <source src={bridge} type="video/mp4" />
      </video>
    </div>
  );
};

export default Test;
