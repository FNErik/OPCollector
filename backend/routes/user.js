const express = require("express")
const userController = require("../controllers/user")

const api = express.Router();

api.post("/user/register", userController.saveUser);
api.get("/user", userController.getUser);
api.post("/user/logIn", userController.logInUser);
api.delete("/user", userController.deleteUser);
api.put("/user", userController.updateUser);

module.exports = api;
