// db.js

import mongoose from "mongoose";

// Get the connection string from the environment variables
const dbUri = process.env.MONGO_URI;

export const connectDB = async () => {
    // Pass the environment variable to mongoose.connect
    await mongoose.connect(dbUri)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.error("DB Connection Error:", error);
    });
}