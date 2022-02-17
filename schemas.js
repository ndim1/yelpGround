
const Joi = require('joi');
const { number } = require('joi')

module.exports.campgroundsSchema = Joi.object({
    product: Joi.object({
        title: Joi.string().required(),
        //images: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        description: Joi.string().required()

    }).required(),
    deleteImages: Joi.array()


})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5)

    }).required()


})
