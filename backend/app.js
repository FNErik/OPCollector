const express = require("express")
const session = require("express-session");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cargar rutas
const helloRoutes = require("./routes/hello")
const taskRoutes = require("./routes/task")
const cardRoutes = require("./routes/card")
const userRoutes = require("./routes/user")
const collectionRoutes = require("./routes/collection")

//Rutas base
app.use("/api", helloRoutes)
app.use("/api", taskRoutes)


module.exports = app; 
