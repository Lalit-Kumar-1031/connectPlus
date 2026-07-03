import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to MongoDb");
        
    } catch (error) {
        console.log("Error in Mongo db connection",error);
    }
} 