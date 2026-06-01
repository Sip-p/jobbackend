import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} 🔥`);
    } catch (error) {
        console.warn(`⚠️  MongoDB connection error: ${error.message}`);
        console.warn('Continuing without MongoDB. Database operations will fail.');
    }
};

export default connectDB;
