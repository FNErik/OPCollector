const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userHasCardSchemma = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cards: [{
        cardCollection: {
            type: String,
            required: true,
        },
        collectionNumber: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});

module.exports = mongoose.model("UserHasCard", userHasCardSchemma)

