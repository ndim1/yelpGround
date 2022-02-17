const express = require('express');
const router = express.Router();


const catchAsync = require('../utils/catchAsync')

const campgroud = require('../controllers/campground')

const { isLogin, isAuthor, validateCampground } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgroud.show))
    .post(isLogin, upload.array('image'), validateCampground, catchAsync(campgroud.makeNew))



router.get('/new', isLogin, campgroud.viewNew)

// show alone product
router.route('/:id')
    .get(catchAsync(campgroud.showAlone))
    .put(isLogin, upload.array('image'), isAuthor, validateCampground, catchAsync(campgroud.edit))
    .delete(isLogin, isAuthor, catchAsync(campgroud.delete))

router.get('/:id/edit', isLogin, isAuthor, catchAsync(campgroud.showEdit))





module.exports = router;