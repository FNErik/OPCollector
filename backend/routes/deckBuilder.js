const express = require("express")
const deckBuilderContoller = require("../controllers/deckBuilder")

const api = express.Router();

api.post("/addNewDeck", deckBuilderContoller.addNewDeck);
api.get("/deckBuilder", deckBuilderContoller.getDecks);
api.post("/deckBuilder/getUserDecks", deckBuilderContoller.getUserDecks);


module.exports = api;