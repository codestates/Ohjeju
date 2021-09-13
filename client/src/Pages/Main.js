import React from "react";
import FavoritePlace from "../Component/FavoritePlace";
import "../css/Main.css";
// import jeju_img from "../Imgs/jeju.jpg";
import jeju_img2 from "../Imgs/jeju2.jpg";
import jeju_img1 from "../Imgs/jeju1.jpg";
import jejutree1 from "../Imgs/jejutree1.jpg";
import jejutree from "../Imgs/jejutree.jpg";

function Main() {
  return (
    <main>
      <div id="main_in">
        <div id="main_text">
          <div id="main_title">Oh! Jeju</div>
          <div id="main_story">
            제주도로 여행가고 싶다. 하지만 혼자서 짜는 여행플래너는 외롭다.
            <br />
            이제는 여행플래너짜기도 여행의 일부인 시대. 함께 여행을 계획하면서
            <br />
            실시간채팅과 더불어 화면공유까지! 오! 제주가 지인들과의 즐거운 제주
            <br />
            여행플래너짜기를 도와드립니다.
          </div>
        </div>
        <div id="main_Banner_black_opacity" />
        <img id="main_Banner_img" src={jejutree1} alt="" />
      </div>
      <FavoritePlace />
    </main>
  );
}

export default Main;
