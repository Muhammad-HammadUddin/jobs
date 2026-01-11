import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed ❌");
        console.log(error);
    }
};

export default connectDB;