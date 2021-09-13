import {React, useState} from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import Signout from "./Signout";

function Header({ isOn, toggleHandler, isLogin}) {
  
  return (
    <header>
      <div id="header_in">
        <div id="header_front">
          <Link to="/">
            <span id="header_logo">Oh! Jeju</span>
          </Link>
          <span id="header_toggle">
            <div className="toggle-container">
              <Toggle isOn={isOn} toggleHandler={toggleHandler} />
            </div>
          </span>
        </div>
        <div id="header_back">
          {isLogin ? (
            <Signout/>
          ):
          <a>
          <SigninModal/>
          <SignupModal/>
          </a>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
