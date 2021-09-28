/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../Component/KakaoMap";
import Chat from "../Component/Chat";

require("dotenv").config();

const Planner = () => {
  return <div><KakaoMap/><Chat/></div>;
};

export default Planner;
