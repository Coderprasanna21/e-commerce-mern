import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI); // Debug line

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("Error Connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

export default connectDB;
