//필요한 모델 require 해와야 함

//리뷰 관련 method
module.exports = {
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