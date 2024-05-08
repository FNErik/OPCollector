const express = require("express")
const userHasCardController = require("../controllers/userHasCard");

const api = express.Router();

api.get("/userHasCards", userHasCardController.getCardsFromUser);
api.post("/userHasCards", userHasCardController.addCardToUser);