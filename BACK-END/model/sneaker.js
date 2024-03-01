const mongoose = require('mongoose')

const sneakerSchema = new mongoose.Schema({
    sneakerName: String,
    price: String,
    color: String,
    rating: String,
    review: String,
})

const UserModel = mongoose.model("sneakers", sneakerSchema);
module.exports = UserModel;