const express = require("express")
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cargar rutas
const helloRoutes = require("../routes/hello")
const taskRoutes = require("../routes/task")

//Rutas base
app.use("/api", helloRoutes)
app.use("/api", taskRoutes)

module.exports = app; 
