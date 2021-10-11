//필요한 모델 require 해와야 함

//리뷰 관련 method
module.exports = {
  //리뷰쪽은 일단 카카오맵api 랑 비짓제주api를 묶는걸 생각해봐야해서 추후작성
  getAttractionReview: async (req, res) => {
    //* endpoint: https://ohjeju.link/review?attractionId=''

    return res.status(200).send('getAttractionReview Test');
  },
  
  createReview: async (req, res) => {
    //* endpoint: https://ohjeju.link/review

    return res.status(200).send('createReview Test');
  },
  
  modifyReview: async (req, res) => {
    //* endpoint: https://ohjeju.link/review?reviewId=''

    return res.status(200).send('modifyReview Test');
  },
  
  deleteReview: async (req, res) => {
    //* endpoint: https://ohjeju.link/review?reviewId=''

    return res.status(200).send('deleteReview Test');
  }
}