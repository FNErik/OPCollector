const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchemma = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    card: {
        type: String,
    }
});

module.exports = mongoose.model("Collection", collectionSchemma)