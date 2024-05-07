const express = require("express")
const taskController = require("../controllers/task");

const api = express.Router();

api.post("/task", taskController.createTask); 
api.get("/task", taskController.getTasks); 
api.get("/task/:id", taskController.getTask)
api.put("/task/:id", taskController.updateTask)
api.delete("/task/:id", taskController.deleteTask)


module.exports = api;
