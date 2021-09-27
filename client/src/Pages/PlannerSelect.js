/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlannerSelect.css";

require("dotenv").config();

function PlannerSelect({plannerList}){
  return (
    <div className='planner_container'>
      {plannerList.map((planner, idx)=>{
        return (
          <Link to='/planner'>
          <div className='planner_item'>
            {planner.name}
          </div>
          </Link>
        )
      })}
    </div>
    
  )
  
};

export default PlannerSelect;
