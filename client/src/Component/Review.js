import React, { useState } from "react";
import style from "../css/Review.module.css";

const Review = () => {
  const [review, setReview] = useState([
    "너무너무 재밌게 놀다 왔어요^^",
    "친구들과 계획을 같이 짜니까 너무 편하고 수월했어요~ㅎㅎ",
    "여자친구랑 의견충돌 없이 코스 다 정했어요 굿",
    "부모님 효도여행 보내드렸습니다^^",
  ]);
  return (
    <div className={style.container}>
      <div className={style.reviewContainer}>
        <div className={style.reviewTitle}>유저 리뷰</div>
        <div className={style.reviewDiv}>
          {review.map((item) => {
            return (
              <div className={style.user}>
                <i class="fas fa-user fa-7x"></i>
                <div className={style.reviewRight}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <div>user</div>
                  <div className={style.reviewWrite}>{item}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Review;
