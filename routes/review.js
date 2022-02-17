const express = require('express');
const router = express.Router({ mergeParams: true });

const Product = require('../models/campground');
const Review = require('../models/review');


const catchAsync = require('../utils/catchAsync')

const review = require('../controllers/review')

const { validateReview, isLogin, isReviewAuthor } = require('../middleware');


router.post('/', validateReview, isLogin, catchAsync(review.postReview))

router.delete('/:reviewid', isLogin, isReviewAuthor, catchAsync(review.deleteReview))


module.exports = router;