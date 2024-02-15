const mongoose = require('mongoose');
require('dotenv').config();

// 1)Define the MongoDB connection URL
// const mongoUrl_Local = process.env.MONGODB_URL_LOCAL;
const mongoUrl = process.env.MONGODB_URL;



// 2)Setup MongoDB connection
mongoose.connect(mongoUrl);



// 3)Get the default connection
const db = mongoose.connection;



// 4)Define event listeners
db.on('connected', () => {
    console.log('Successfully MongoDb Connection ');
});

db.on('error', (err) => {
    console.error('Error 404:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});



// 5)Export the database connection
module.exports = db;
