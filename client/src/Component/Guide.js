import React, { useState, useRef } from "react";
import "../css/Guide.css";
import plannerBase from "../Imgs/PlannerBase.png";
import plannerPlanner from "../Imgs/PlannerPlanner.jpg";
import plannerGroup from "../Imgs/PlannerGroup.jpg";
import plannerChat from "../Imgs/PlannerChat.jpg";

require("dotenv").config();

function Guide() {
  const [showGuide, setshowGuide] = useState(true); //가이드모달

  const handleGuideModal = () => {
    if (showGuide === false) {
      setshowGuide(true);
    } else {
      setshowGuide(false);
    }
  };

  let count = useRef(0);

  // const [count, setCount] = useState(-100);
  const [imgSlide, setImgSlide] = useState({
    transform: "translate(0vw)",
  });

  const slideNextHandler = () => {
    count.current -= 10;
    setImgSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  const slideBeforeHandler = () => {
    count.current += 10;
    setImgSlide({
      transform: `translate(${count.current}vw)`,
    });
  };

  const guideSlideImage = [plannerBase, plannerPlanner, plannerGroup, plannerChat]

  




  return (
    <div>
      {showGuide ? (
        <div>
          <div className="guide_popup" onClick={handleGuideModal}></div>
          <div className="guide_popup_inner">
            <div className="guide_title">오!제주 둘러보기</div>
            <div className="guide_content">
            
        {guideSlideImage.map((image)=>{
          return(
            <div>
            <img className='guide_content_image' src={image}/>
            </div>
          );
        })}
       



        </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Guide;
