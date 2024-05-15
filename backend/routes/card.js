const express = require("express")
const cardController = require("../controllers/card");

const api = express.Router();

api.post("/card", cardController.createCard);
api.get("/card", cardController.getCards);
api.get("/card/collections", cardController.getDistinctCollections)
api.get("/card/types", cardController.getDistinctTypes)
api.get("/card/names", cardController.getDistinctNames)
api.get("/card/:id", cardController.getCard)
api.post("/card/filterCard", cardController.filterCard)
api.put("/card/:id", cardController.updateCard)
api.delete("/card/:id", cardController.deleteCard)


module.exports = api;
