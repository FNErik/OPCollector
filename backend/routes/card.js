const express = require("express")
const cardController = require("../controllers/card");

const api = express.Router();

api.post("/card", cardController.createCard); 
api.get("/card", cardController.getCards); 
api.get("/card/:id", cardController.getCard)
api.put("/card/:id", cardController.updateCard)
api.delete("/card/:id", cardController.deleteCard)


module.exports = api;
