const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchemma = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Task", taskSchemma)