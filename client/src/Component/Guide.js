import React, { useState } from "react";
import "../css/Guide.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import axios from "axios";
import kakao from "../Imgs/kakao_login_large_wide.png";
import google from "../Imgs/btn_google_signin_light_normal_web@2x.png";
import xbutton from "../Imgs/xbutton.png";
import { useHistory } from "react-router";
import plannerBase from "../Imgs/plannerBase.png";

require("dotenv").config();

function Guide() {
  const [showGuide, setshowGuide] = useState(true); //가이드모달

  const handleGuideModal = () => {
    if (showGuide === false) {
      setshowGuide(true);
    } else {
      setshowGuide(false);
    }
  };

  return (
    <div>
      {showGuide ? (
        <div>
          <div className="guide_popup" onClick={handleGuideModal}></div>
          <div className="guide_popup_inner">
            <div className="guide_title">오!제주 둘러보기</div>
            <div className="guide_content">
              <button className="move_to_next">왼</button>
              <img className="guide_content_image" src={plannerBase} />
              <button className="move_to_next">오른</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Guide;
