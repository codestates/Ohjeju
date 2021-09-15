/* eslint-disable */
import "./App.css";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "./Pages/Main";
import Mypage from "./Pages/Mypage";
import PlannerSelect from "./Pages/PlannerSelect";
import Planner from "./Pages/Planner";
import Attraction from "./Pages/Attraction";
import Loading from "./Component/Loading";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

require("dotenv").config();

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setisOn] = useState(false);

  const SERVER_URL = process.env.SERVER_URL || "http://localhost:80";
  // useEffect(() => {
  //   scrollStop();
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   scrollStop();
  // }, [isLoading]);

  // useEffect(() => {
  //   getImage();
  // }, []);

  const scrollStop = () => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }
    if (!isLoading) {
      document.body.style.overflow = "unset";
    }
  };
  const toggleHandler = () => {
    setisOn(!isOn);
  };

  const [isLogin, setisLogin] = useState(false);
  const [userInfo, setuserInfo] =useState({ //회원탈퇴하든 뭘하든 기본email username값이 존재해야 마이페이지유저정보 렌더링표시 에러가 안남
    email:'default-email',
    userName:'default-userName'
  });

  const getuserInfo = (res) =>{ //유저정보 받아오기
    axios.get(`${SERVER_URL}/user/info?userId=${res.data.id}`, { withCredentials: true })
          .then((res)=>{
            setuserInfo(res.data)
            setisLogin(true)
          })
  }

  const handleLogout = () => {  //로그아웃실행
    axios.post(`${SERVER_URL}/signout`).then((res) => {
      setisLogin(false);
      setuserInfo({
        email:'default-email',
        userName:'default-userName'
      });
    });
  };

  const handleuserInfoDestroy = () => { //회원탈퇴실행
    setisLogin(false);
    setuserInfo({
      email:'default-email',
      userName:'default-userName'
    });
  }

  return (
    <BrowserRouter>
      {/* {isLoading ? <Loading /> : null} */}
      <Header isOn={isOn} toggleHandler={toggleHandler} isLogin={isLogin} getuserInfo={getuserInfo} handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/mypage">
          <Mypage userInfo={userInfo} getuserInfo={getuserInfo} handleuserInfoDestroy={handleuserInfoDestroy}/>
        </Route>
        <Route path="/plannerSelect">
          <PlannerSelect />
        </Route>
        <Route path="/planner">
          <Planner />
        </Route>
        <Route path="/attraction">
          <Attraction />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
