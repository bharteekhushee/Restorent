const mongoose = require('mongoose');
require('dotenv').config()
// const mongoURL = 'mongodb://localhost:27017/NewHotel';
// const mongoURL="mongodb+srv://bharteekhushee_db_user:FO3JFgobtNPOgzYT@cluster0.4dhgbyf.mongodb.net/"
const mongoURL=process.env.mongoURL_Local
// const mongoURL=process.env.mongoURL
// NEW correct syntax (no options needed)
mongoose.connect(mongoURL);

// Get the connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB server");
});

module.exports = db;
