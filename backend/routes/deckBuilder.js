const express = require("express")
const deckBuilderContoller = require("../controllers/deckBuilder")

const api = express.Router();

api.post("/addNewDeck", deckBuilderContoller.addNewDeck);
api.post("/saveEditedDeck", deckBuilderContoller.saveEditedDeck);
api.get("/deckBuilder", deckBuilderContoller.getDecks);
api.post("/deckBuilder/getUserDecks", deckBuilderContoller.getUserDecks);
api.get("/getDeckFormatted/:userId/:deckId/download", deckBuilderContoller.getDeckFormatted);


module.exports = api;