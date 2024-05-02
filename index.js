const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;
const urlMongoAtlas = "mongodb+srv://admin:OPdbPassword@opcollectordb.cndqjop.mongodb.net/OPCollector";

mongoose.connect(urlMongoAtlas);

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log("MongoDB connection successful");
    //Levantar servidor
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
});
