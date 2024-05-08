const express = require("express")
const session = require("express-session");
const app = express();

// Configuración de express-session
app.use(session({
    secret: 'miSecretoDePuenteViejo',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Cargar rutas

const taskRoutes = require("./routes/task")
const cardRoutes = require("./routes/card")
const userRoutes = require("./routes/user")
const userHasCardRoutes = require("./routes/userHasCard")

//Rutas base
app.use("/api", taskRoutes)
app.use("/api", cardRoutes)
app.use("/api", userRoutes)
app.use("/api", userHasCardRoutes)

module.exports = app; 
