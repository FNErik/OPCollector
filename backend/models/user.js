const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type: String,
        require: true,
    },
    surname: {
        type: String, 
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false,
    },
    collectionTotalNumbers: {
        type: Number,
        require: true,
        default: 0,
    },
});

module.exports = mongoose.model("User", userSchema)