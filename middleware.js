const Product = require("./models/campground");
const Review = require("./models/review");
const { campgroundsSchema, reviewSchema } = require('./schemas')
const expressError = require('./utils/expressError');


module.exports.validateReview = (req, res, next) => { 
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
}
module.exports.validateCampground = (req, res, next) => { 
    const { error } = campgroundsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first')
        return res.redirect('/login')
    }
    next();
}
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'Cannot make this because you are not a owner');
        res.redirect(`/campground/${id}`);
    }
    next();

}
module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewid, id } = req.params;
    const review = await Review.findById(reviewid);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Cannot make this because you are not a owner');
        res.redirect(`/campground/${id}`);
    }
    next();

}