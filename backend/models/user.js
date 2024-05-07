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
    },
    password: {
        type: String,
        require: true,
    },
    collectionTotalNumbers: {
        type: Number,
        require: true,
        default: 0,
    },
});

module.exports = mongoose.model("User", taskSchemma)