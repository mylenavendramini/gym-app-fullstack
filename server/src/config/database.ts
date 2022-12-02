const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pihxa.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
