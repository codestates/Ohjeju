import React from "react";
import style from "../css/Footer.module.css";
import "../App.css";

const Footer = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.logo}>
          <div className={style.gitIcon}>
            <i class="fab fa-github fa-7x"></i>
          </div>
        </div>

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
          {/* <h2>Github</h2>
          <div className={style.gitEmail} style={{ padding: "0px" }}>
            <div style={{ padding: "10px" }}>Lee sangkwon</div>
            <div style={{ padding: "10px" }}>Choi yongseok</div>
            <div style={{ padding: "10px" }}>Kim sinjae</div>
            <div style={{ padding: "10px" }}>Kim minji</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
