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
                default: "No name",
            },
            lead:{
                cardId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Card',
                    required: true,
                },
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
                name:{
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
                quantity: {
                    type: Number,
                    default: 1 
                },
                _id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Card',
                    required: true,
                }
            }]
        }
    }]
});


module.exports = mongoose.model('Deck', deckBuilder);