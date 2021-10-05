/* eslint-disable */
import React from "react";
import FavoritePlace from "../Component/FavoritePlace";
import "../App.css";
import "../css/Main.css";
import background2 from "../Imgs/background2.png";
import background1 from "../Imgs/background1.jpg";
import Footer from "../Component/Footer";
import Couple from "../Component/Couple";
import { Link } from "react-router-dom";

function Main({ placeList, getPlace }) {
  return (
    <main>
      <div id="main_in">
        <div id="main_text">
          <div id="main_title">
            가족, 친구, 애인 모두가 <br></br>함께 계획하는 여행플래너
          </div>
          <div id="main_story">
            제주도로 여행가고 싶다. 하지만 혼자서 짜는 여행플래너는 외롭다.
            <br />
            이제는 여행플래너짜기도 여행의 일부인 시대. 함께 여행을 계획하면서
            <br />
            실시간채팅과 더불어 화면공유까지! 오! 제주가 지인들과의 즐거운 제주
            <br />
            여행플래너짜기를 도와드립니다.
            <Link to='planner'>
            <button className='main_to_planner'>Get own Planner!</button>
            </Link>
          </div>
        </div>
        <div id="main_Banner_black_opacity" />
        <img id="main_Banner_img" src={background2} alt="" />
      </div>
      <FavoritePlace placeList={placeList} getPlace={getPlace} />
      <Couple></Couple>
    </main>
  );
}

export default Main;
