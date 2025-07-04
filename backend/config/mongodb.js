import mongoose from "mongoose";

const connectDB = async () => {

    try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Optional: Stop app if DB connection fails
  }

}

export default connectDB;
