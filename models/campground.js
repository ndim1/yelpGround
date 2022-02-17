const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')

});
ImageSchema.virtual('cico').get(function () {
    return this.url.replace('/upload', '/upload/w_600')

});
const yelpGround = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    },
    location: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

yelpGround.post('findOneAndDelete', async function (doc) { 
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }

)


const Product = mongoose.model('Product', yelpGround);
module.exports = Product;

