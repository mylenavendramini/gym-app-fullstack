import express, { Express } from "express";
import mongoose from "mongoose";
import workoutRoutes from "./routes/index";
import cors from "cors";

// Auth:
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import logger from "morgan";
import { connectDB } from "./config/database";

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pihxa.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

//Connect To Database
connectDB();

const app: Express = express();
// const PORT: string | number = process.env.PORT || 4001;
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Auth: Passport config
// require("./config/passport")(passport);
require("./config/passport")(passport);

// //Connect To Database
// connectDB();

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//Logging
app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    store: MongoStore.create({
      mongoUrl: uri,
    }),
  })
);

// Auth: Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// Routes:
app.use(workoutRoutes);

// mongoose
//   .connect(uri)
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => {
//     throw error;
//   });

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
