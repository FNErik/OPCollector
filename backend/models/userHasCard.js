const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userHasCardSchemma = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    cards: [{
        cardObjId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});

module.exports = mongoose.model("UserHasCard", userHasCardSchemma)

