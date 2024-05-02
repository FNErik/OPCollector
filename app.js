const express = require("express")
const app = express();


//Cargar rutas
const helloRoutes = require("./routes/hello")

//Rutas base
app.use("/api", helloRoutes)

module.exports = app;