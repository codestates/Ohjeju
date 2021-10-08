/* eslint-disable */
import React from "react";
import style from "../css/Footer.module.css";
import "../App.css";
import logo1 from "../Imgs/logo1.png";
import logo2 from "../Imgs/logo2.png";
import logo3 from "../Imgs/logo3.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.footerBox}>
        <div className={style.leftBox}>
          <h1 className={style.contact}>Contact</h1>
          <div className={style.company}>
            <div style={{ marginBottom: "10px" }}>Oh!jeju</div>
            <div style={{ marginBottom: "10px" }}>
              2, Gonghang-ro, Jeju-si, Jeju-do
            </div>
            <div style={{ marginBottom: "10px" }}>Republic of Korea</div>
          </div>
          <div className={style.tele}>
            <div style={{ marginBottom: "10px" }}>Tel 123-456-7890</div>
            <div style={{ marginBottom: "10px" }}>Email Ohjeju@gmail.com</div>
          </div>
        </div>
        <div className={style.middleBox}>
          <div className={style.developer}>Developer</div>
          <div style={{ marginTop: "20px" }}>
            <i class="fab fa-github fa-lg"></i>
            <a
              href="https://github.com/Lee-Sangkwon1"
              style={{ color: "white", marginLeft: "10px" }}
            >
              Choi yongsuk
            </a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <i class="fab fa-github fa-lg"></i>
            <a
              href="https://github.com/Lee-Sangkwon1"
              style={{ color: "white", marginLeft: "10px" }}
            >
              Lee sangkwon
            </a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <i class="fab fa-github fa-lg"></i>
            <a
              href="https://github.com/Lee-Sangkwon1"
              style={{ color: "white", marginLeft: "10px" }}
            >
              Kim sinjae
            </a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <i class="fab fa-github fa-lg"></i>
            <a
              href="https://github.com/Lee-Sangkwon1"
              style={{ color: "white", marginLeft: "10px" }}
            >
              Kim minji
            </a>
          </div>
        </div>
        <div className={style.rightBox}>
          <h3 style={{ margin: "10px" }}>Or Leave a Message Here</h3>
          <div style={{ display: "flex" }}>
            <input
              className={style.formInput}
              type="email"
              placeholder="Full name"
            ></input>
            <input
              className={style.formInput}
              type="email"
              placeholder="Email"
            ></input>
          </div>
          <div>
            <input placeholder="Subject" className={style.formSubject}></input>
          </div>
          <div>
            <p style={{ margin: "10px" }}>Your Message..</p>
            <textarea
              className={style.formSubject}
              style={{ fontSize: "15px" }}
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className={style.Btn}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
