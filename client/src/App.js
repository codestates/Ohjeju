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

  const SERVER_URL = process.env.SERVER_URL || "https://localhos:80";
  // useEffect(() => {
  //   scrollStop();
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   scrollStop();
  // }, [isLoading]);

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

  // const useHistory =useHistory();

  const [isLogin, setisLogin] = useState(false);
  const [userInfo, setuserInfo] = useState({
    id: "",
    email: "",
    userName: "",
    password: "",
    plannerId: "",
    admin: false,
    image: "",
  });

  const handleLogout = () => {
    axios.post(`${SERVER_URL}/user/signout`).then((res) => {
      setuserInfo(null);
      setisLogin(false);
      // history.push('/')
    });
  };

  return (
    <BrowserRouter>
      {/* {isLoading ? <Loading /> : null} */}
      <Header isOn={isOn} toggleHandler={toggleHandler} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/mypage">
          <Mypage
            userInfo={userInfo}
            setisLogin={setisLogin}
            handleLogout={handleLogout}
            //  getuserInfo={getuserInfo}
            setuserInfo={setuserInfo}
          />
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
    </BrowserRouter>
  );
}

export default App;
