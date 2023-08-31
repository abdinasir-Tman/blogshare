import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_ID, {
      dbName: "blogshare",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    (isConnected = true), console.log("Database Connected");
  } catch (e) {
    console.log(e);
    isConnected = false;
  }
};
