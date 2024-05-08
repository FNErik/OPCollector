const app = require("./app");
const mongoose = require("mongoose");
const port = 4022;
const urlMongoAtlas = "mongodb+srv://admin:OPdbPassword@opcollectordb.cndqjop.mongodb.net/OPCollector";

mongoose.connect(urlMongoAtlas);

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log("MongoDB connection successful");
    //Levantar servidor
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
});
