import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error while connecting db", error);
  }
};

export default connectdb;
