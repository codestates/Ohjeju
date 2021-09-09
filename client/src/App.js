import './App.css';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Main from './Component/Main'
import Mypage from './Component/Mypage'
import PlannerSelect from './Component/PlannerSelect'
import Planner from './Component/Planner'
import Attraction from './Component/Attraction'

require('dotenv').config();


function App() {

  
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/mypage">
          <Mypage/>
        </Route>
        <Route path="/plannerSelect">
          <PlannerSelect/>
        </Route>
        <Route path="/planner">
          <Planner/>
        </Route>
        <Route path="/attraction">
          <Attraction/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
