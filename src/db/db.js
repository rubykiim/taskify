const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log("Connected to database!")
}

// exports.connectDB = connectDB;

