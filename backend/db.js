require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
let client;

async function connectDB() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log("MongoDB Connected Successfully");
    }
    return client;
}

const mongoose = require('mongoose');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDB:", err));


module.exports = connectDB;



