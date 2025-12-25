import mongoose from "mongoose";

/**
 * Database connection configuration
 * Connects to MongoDB using the URI from environment variables
 */

const dbUri = process.env.MONGO_URI;

export const connectDB = async () => {
    if (!dbUri) {
        console.warn("⚠️  MONGO_URI not found in environment variables - App will use dummy data");
        return;
    }
    try {
        await mongoose.connect(dbUri);
        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.warn("⚠️  DB Connection Failed - App will use dummy data:", error.message);
    }
}