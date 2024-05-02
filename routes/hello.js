const express = require("express");
const helloController = require("../controllers/hello")

const api = express.Router();

api.get("/hello", helloController.getHello)

module.exports = api;
