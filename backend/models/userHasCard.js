const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userHasCardSchemma = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cards: [{
        cardObjId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});

module.exports = mongoose.model("UserHasCard", userHasCardSchemma)

