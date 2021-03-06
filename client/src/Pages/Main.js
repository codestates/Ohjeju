/* eslint-disable */
import React from "react";
import FavoritePlace from "../Component/FavoritePlace";
import "../App.css";
import "../css/Main.css";
import Couple from "../Component/Couple";
import { Link } from "react-router-dom";
import Test from "../Component/Test";

function Main({ placeList, getPlace, isLogin }) {
  return (
    <main>
      <div id="main_in">
        {/* 메인 위 */}
        <Test />
        <div id="main_text">
          <div id="main_title">
            가족, 친구, 애인 모두가 <br></br>함께 계획하는 여행플래너
          </div>
          <div id="main_story">
            우리 마음을 달래줄 힐링공간, 제주. 혼자 세우는 여행계획은 NO!
            <br />
            당신의 여행을 책임질 여행의 첫 발걸음, Oh! Jeju
            <br />
            함께 떠날 소중한 사람들과 화면공유와 실시간 채팅으로 편하고 쉽게
            <br />
            여행을 계획해보세요!
            <br />
            {isLogin ? (
              <Link to="plannerSelect">
                <button className="main_to_plannerSelect">
                  Get own Planner!
                </button>
              </Link>
            ) : (
              <Link to="planner">
                <button className="main_to_planner">Get own Planner!</button>
              </Link>
            )}
          </div>
        </div>
        <div id="main_Banner_black_opacity" />
      </div>
      {/* 메인 아래 */}
      {/* <Test /> */}
      <FavoritePlace placeList={placeList} getPlace={getPlace} />
      <Couple />
      {/* <Guide />  */}
      {/* <Review /> */}
    </main>
  );
}

export default Main;
