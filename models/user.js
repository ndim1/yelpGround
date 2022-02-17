const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pasportlocalMongoose = require('passport-local-mongoose');




const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true

    }
})

userSchema.plugin(pasportlocalMongoose)
module.exports = mongoose.model('User', userSchema)

