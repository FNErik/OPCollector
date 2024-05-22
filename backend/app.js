const express = require("express")
const session = require("express-session");
const cors = require('cors');
const app = express();

// Configuración de express-session
app.use(cors());
app.use(session({
    secret: 'miSecretoDePuenteViejo',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Cargar rutas
const cardRoutes = require("./routes/card")
const userRoutes = require("./routes/user")
const userHasCardRoutes = require("./routes/userHasCard")
const deckBuilderRoutes = require("./routes/deckBuilder")

//Rutas base
app.use("/api", cardRoutes)
app.use("/api", userRoutes)
app.use("/api", userHasCardRoutes)
app.use("/api", deckBuilderRoutes)

module.exports = app; 
