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
import FavoritePlace from "./Component/FavoritePlace";
import KakaoOAuth from "./Component/KakaoOAuth";
import GoogleOAuth from "./Component/GoogleOAuth";
import Chat from "./Component/Chat";

require("dotenv").config();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setisOn] = useState(false);

  const SERVER_URL = process.env.SERVER_URL || "http://localhost:80";
  // useEffect(() => {
  //   scrollStop();
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
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

  const [page, setPage] = useState(""); //페이지상태관리
  const [isLogin, setisLogin] = useState(false); //로그인상태관리
  const [userInfo, setuserInfo] = useState({
    //회원탈퇴하든 뭘하든 기본email username값이 존재해야 마이페이지유저정보 렌더링표시 에러가 안남
    email: "default-email",
    userName: "default-userName",
  });

  const getuserInfo = (res) => {
    //유저정보 받아오기
    axios
      .get(`${SERVER_URL}/user/info?userId=${res.data.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setuserInfo(res.data);
        setisLogin(true);
      });
  };

  const handleLogout = () => {
    //로그아웃실행
    axios
      .post(`${SERVER_URL}/signout`, "NO_BODY_DATA", { withCredentials: true })
      .then((res) => {
        setisLogin(false);
        setuserInfo({
          email: "default-email",
          userName: "default-userName",
        });
        if (page === "mypage") {
          //현재페이지가 마이페이지일경우 메인페이지로 이동
          window.location.replace("/");
        }
      });
  };

  const handleuserInfoDestroy = () => {
    //회원탈퇴실행
    setisLogin(false);
    setuserInfo({
      email: "default-email",
      userName: "default-userName",
    });
  };

  const [placeList, setPlaceList] = useState([]);

  const getPlace = () => {
    axios.get("http://localhost:80/attractions").then((res) => {
      let arr = [...res.data];
      let newarr = arr.slice(0, 27);
      setPlaceList(newarr);
    });
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    getPlace();
  }, []);


  return (
    <BrowserRouter>
      {/* {isLoading ? <Loading /> : null} */}
      <Header
        isOn={isOn}
        toggleHandler={toggleHandler}
        page={page}
        setPage={setPage}
        userInfo={userInfo}
        isLogin={isLogin}
        getuserInfo={getuserInfo}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route path="/OAuth/kakao">
          <KakaoOAuth setuserInfo={setuserInfo} setisLogin={setisLogin} />
        </Route>
        <Route path="/OAuth/google">
          <GoogleOAuth setuserInfo={setuserInfo} setisLogin={setisLogin} />
        </Route>
        <Route exact path="/">
          <Main placeList={placeList} getPlace={getPlace} />
        </Route>
        <Route path="/mypage">
          <Mypage
            userInfo={userInfo}
            getuserInfo={getuserInfo}
            handleuserInfoDestroy={handleuserInfoDestroy}
          />
        </Route>
        <Route path="/plannerSelect">
          <PlannerSelect
            userInfo={userInfo}  
          />
        </Route>
        <Route path="/favoritePlace">
          <FavoritePlace placeList={placeList} getPlace={getPlace} />
        </Route>
        <Route path="/planner">
          <Planner />
        </Route>
        <Route path="/attraction" component={Attraction} />
        <Route path="/chat" component={Chat} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
