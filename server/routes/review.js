const router = require('express').Router();
const { getAttractionReview, createReview, modifyReview, deleteReview } = require('../controller/ReviewController');

router.get('/', getAttractionReview);
router.post('/', createReview);
router.patch('/', modifyReview);
router.delete('/', deleteReview);
//신재님이 작성해주신 내용은 get만 작성되어 있던데 이유가 있나요??

module.exports = router;