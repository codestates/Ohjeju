/* eslint-disable */
import { React, useState } from "react";
import axios from "axios";
import "../css/SignupModal.css";

export default function SignupModal() {
  const [showSignupModal, setshowSignupModal] = useState(false);

  return (
    <signup>
      <span id="header_SignUp" onClick={setshowSignupModal}>
        회원가입
      </span>
      {showSignupModal ? (
        <div className="popup">
          <div className="popup_inner"></div>
        </div>
      ) : null}
    </signup>
  );
}
