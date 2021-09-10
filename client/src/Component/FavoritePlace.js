import React, { useState } from "react";
import "../css/FavoritePlace.css";

function FavoritePlace() {
  return (
    <div className="favorite">
      <div className="favorite_in">
        <div className="favorite_title">명소</div>

        <div className="favorite_poster">
          <div className="flex-img">
            <img className="favorite_img" src="./Notebook.webp" alt="" />
            <img className="favorite_img" src="./Notebook.webp" alt="" />
            <img className="favorite_img" src="./Notebook.webp" alt="" />
            <img className="favorite_img" src="./Notebook.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritePlace;
