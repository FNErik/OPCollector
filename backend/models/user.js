const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    surname: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    collectionTotalNumbers: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("User", userSchema)