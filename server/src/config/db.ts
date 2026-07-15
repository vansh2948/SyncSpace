import mongoose from "mongoose";
import env from "./env";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);

    console.log("==================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("==================================");
  } catch (error) {
    console.error("==================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    console.error("==================================");

    process.exit(1);
  }
};

export default connectDatabase;