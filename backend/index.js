const app = require("./app");
require('dotenv').config();
const mongoose = require("mongoose");
const port = process.env.PORT || 4022;

console.log(port + " HJW"); // Small easter egg

const urlMongoAtlas = process.env.MONGO_URI

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
