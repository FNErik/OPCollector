const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = Schema = ({
    name: {
        type: String,
        require: true,
    },
    collection: {
        type: String,
        require: true,
    },
    collectionNumber: {
        type: String,
        require: true,
    },
    colour: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Referencia al modelo de usuario
    }
});

module.exports = mongoose.model("Card", cardSchema)