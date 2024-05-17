const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const cardSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cardCollection: {
        type: String,
        required: true,
    },
    collectionNumber: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        required: true,
    },
    defaultQuantity: {
        type: Number,
        default: 1,
        required: true,
    }
});

module.exports = mongoose.model("Card", cardSchema)