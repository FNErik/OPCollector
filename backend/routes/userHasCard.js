const express = require("express")
const userHasCardController = require("../controllers/userHasCard");

const api = express.Router();

api.post("/getCardsfromUser", userHasCardController.getCardsFromUser);
api.post("/addCardToUser", userHasCardController.addCardToUser);
api.delete("/userHasCards", userHasCardController.removeCardFromUser);


module.exports = api;
