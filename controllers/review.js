const Product = require('../models/campground');
const Review = require('../models/review');


module.exports.postReview = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    product.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await product.save();
    req.flash('succses', 'Congrats you made a new review')
    res.redirect(`/campground/${product._id}`)
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewid } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Product.findByIdAndDelete(reviewid);
    req.flash('succses', 'Congrats you succsesfuly deletet a review')
    res.redirect(`/campground/${id}`)
}