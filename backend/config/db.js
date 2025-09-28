// db.js

import mongoose from "mongoose";

// Get the connection string from the environment variables
const dbUri = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        // Pass the environment variable to mongoose.connect
        await mongoose.connect(dbUri);
        console.log("DB Connected");
    } catch (error) {
        console.warn("DB Connection Failed - App will use dummy data:", error.message);
        // Don't throw the error, let the app continue with dummy data
    }
}