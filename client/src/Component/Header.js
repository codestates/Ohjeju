import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

function Header({ isOn, toggleHandler }) {
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
          <SigninModal/>
          <SignupModal/>
        </div>
      </div>
    </header>
  );
}

export default Header;
