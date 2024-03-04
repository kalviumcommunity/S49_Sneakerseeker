const mongoose = require('mongoose')

const SneakerSchema = new mongoose.Schema({
    sneakerName: String,
    price: String,
    color: String,
    rating: String,
    review: String,
})

const SneakerModel = mongoose.model("sneaker", SneakerSchema);
module.exports = SneakerModel;