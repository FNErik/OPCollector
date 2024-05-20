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
                cardCollection: {
                    type: String,
                    required: true,
                },
                collectionNumber: {
                    type: String,
                    required: true,
                }
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


module.exports = mongoose.model('Deck', deckBuilder);