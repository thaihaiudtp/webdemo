import mongoose from "mongoose";
const MONGODB_URI  =  "mongodb+srv://zLYUSsCq:K3neqNcsjJBEIctE@us-east-1.ufsuw.mongodb.net/web";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("MongoDB connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
}