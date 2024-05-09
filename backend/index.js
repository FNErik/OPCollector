const app = require("./app");
require('dotenv').config();
const mongoose = require("mongoose");
const port = process.env.PORT || 4022;

console.log("[OPCollector] starting server");

const urlMongoAtlas = process.env.MONGO_URI
console.log("[OPCollector] connecting to remote database");

mongoose.connect(urlMongoAtlas);

mongoose.connection.on('error', (err) => {
    console.error('[OPCollector] MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log("[OPCollector] MongoDB connection successful");

    app.listen(port, () => {
        console.log("[OPCollector] listening on port:", port);
    });
});
