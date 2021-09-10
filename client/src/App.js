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

import Main from './Pages/Main'
import Mypage from './Pages/Mypage'
import PlannerSelect from './Pages/PlannerSelect'
import Planner from './Pages/Planner'
import Attraction from './Pages/Attraction'

require('dotenv').config();

const SERVER_URL =process.env.SERVER_URL || 'https://localhos:80';

function App() {

  const useHistory =useHistory();
  
  const [isLogin, setisLogin] = useState(false);
  const [userInfo, setuserInfo] = useState({
    id: '',
    email: '',
    userName: '',
    password: '',
    plannerId: '',
    admin: false,
    image: ''
  })

  const handleLogout = () => {
    axios.post(`${SERVER_URL}/user/signout`)
    .then((res)=>{
      setuserInfo(null);
      setisLogin(false);
      history.push('/')
    })
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/mypage">
          <Mypage
           userInfo={userInfo}
           setisLogin={setisLogin}
           handleLogout={handleLogout}
           getuserInfo={getuserInfo}
           setuserInfo={setuserInfo}/>
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
