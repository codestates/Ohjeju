/* eslint-disable */
import React from "react";
import style from "../css/Footer.module.css";
import "../App.css";
import logo1 from "../Imgs/logo1.png";
import logo2 from "../Imgs/logo2.png";
import logo3 from "../Imgs/logo3.png";

const Footer = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        {/* <img src={logo2} className={style.logoImg}></img> */}
        <div className={style.logo}>
          <h2>Front end</h2>
          <p>Lee sangkwon</p>
          <p>Choi yongseok</p>
        </div>

        <div className={style.logo}>
          <h2>Back end</h2>
          <p>Kim sinjae</p>
          <p>Kim minji</p>
        </div>

        <div className={style.logo1}>
          <h2>GitHub</h2>
          <div className={style.gitEmail} style={{ padding: "0px" }}>
            <div style={{ padding: "10px" }}>Lee sangkwon</div>
            <div style={{ padding: "10px" }}>Choi yongseok</div>
            <div style={{ padding: "10px" }}>Kim sinjae</div>
            <div style={{ padding: "10px" }}>Kim minji</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
