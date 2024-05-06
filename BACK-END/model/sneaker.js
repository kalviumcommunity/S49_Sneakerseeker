const mongoose = require('mongoose')
const Joi = require('joi');

const SneakerSchema = new mongoose.Schema({
    sneakerName: String,
    price: String,
    color: String,
    rating: String,
    review: String,
    created_by: String
})

const SneakerModel = mongoose.model("sneaker", SneakerSchema);
module.exports = SneakerModel;