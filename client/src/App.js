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
import Main from "./Component/Main";
import Mypage from "./Component/Mypage";
import PlannerSelect from "./Component/PlannerSelect";
import Planner from "./Component/Planner";
import Attraction from "./Component/Attraction";
import Loading from "./Component/Loading";
import Header from "./Component/Header";

require("dotenv").config();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setisOn] = useState(false);

  useEffect(() => {
    scrollStop();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    scrollStop();
  }, [isLoading]);

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

  return (
    <BrowserRouter>
      {/* {isLoading ? <Loading /> : null} */}
      <Header isOn={isOn} toggleHandler={toggleHandler} />
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
    </BrowserRouter>
  );
}

export default App;
