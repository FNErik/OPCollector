const express = require("express")
const deckBuilderContoller = require("../controllers/deckBuilder")

const api = express.Router();

api.post("/deckBuilder", deckBuilderContoller.addNewDeck);
api.get("/deckBuilder", deckBuilderContoller.getDecks);


module.exports = api;