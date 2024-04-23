const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String 
});

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
const UserModal = mongoose.model("users", UserSchema);
module.exports = {
    UserModal,
    userValidationSchema
};