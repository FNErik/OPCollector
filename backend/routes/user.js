const express = require("express")
const userController = require("../controllers/user")

const api = express.Router();

api.post("/user", userController.saveUser);
