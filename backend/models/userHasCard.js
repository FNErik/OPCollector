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
        }
    }]
});

module.exports = mongoose.model("UserHasCard", userHasCardSchemma)