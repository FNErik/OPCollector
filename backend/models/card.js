const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const cardSchema = Schema = ({
    name: {
        type: String,
        require: true,
    },
    cardCollection: {
        type: String,
        require: true,
    },
    collectionNumber: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    rarity: {
        type: String,
        require: true,
    },
    /*userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Referencia al modelo de usuario
    }*/
});

module.exports = mongoose.model("Card", cardSchema)