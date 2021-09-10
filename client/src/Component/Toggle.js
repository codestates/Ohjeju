import React, { useState } from "react";
import "../css/Toggle.css";

function Toggle({ isOn, toggleHandler }) {
  return (
    <div>
      <div className="toggleContainer" onClick={toggleHandler}>
        <div
          className={`toggle-container ${
            isOn ? "toggle--checked" : "toggle--unChecked"
          }`}
        />
        <div
          className={`toggle-circle ${
            isOn ? "toggle--checked1" : "toggle--unChecked1"
          }`}
        />
      </div>
    </div>
  );
}

export default Toggle;
