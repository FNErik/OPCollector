const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckBuilder = Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    decks: [{
        deck: {
            name: {
                type: String,
                required: true,
            },
            lead:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
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
        }
    }]
});

function arrayLimit(val) {
    return val.length <= 50;
}

deckBuilder.path('decks.deck').validate(arrayLimit, '{PATH} exceeds the limit of 50');

module.exports = mongoose.model('Deck', deckBuilder);