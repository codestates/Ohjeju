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
  const [userInfo, setuserInfo] = useState(null);

  const getuserInfo = (res) => {
    //로그인은 되는데 유저정보가 안받아와진다 서버쪽첫번째 'can't access'
    axios
      .get(`${SERVER_URL}/user/info?userId=${res.data.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setuserInfo({
          id: res.data.id,
          email: res.data.email,
          userName: res.data.userName,
          password: res.data.password,
          plannerId: res.data.plannerId,
          admin: res.data.admin,
          image: res.data.image,
        });
        setisLogin(true);
      });
  };

  const handleLogout = () => {
    //로그아웃실행
    axios.post(`${SERVER_URL}/signout`).then((res) => {
      setisLogin(false);
      setuserInfo(null);
    });
  };

  return (
    <BrowserRouter>
      {/* {isLoading ? <Loading /> : null} */}
      <Header
        isOn={isOn}
        toggleHandler={toggleHandler}
        isLogin={isLogin}
        getuserInfo={getuserInfo}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/mypage">
          <Mypage />
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
