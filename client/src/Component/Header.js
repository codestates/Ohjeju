import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";

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
          <Link to="/login">
            <span id="header_SignIn">로그인</span>
          </Link>
          <Link to="/signUp">
            <span id="header_SignUp">회원가입</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
