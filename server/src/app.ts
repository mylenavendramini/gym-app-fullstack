import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutRoutes from "./routes";
// Auth:
// import passport from "passport";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import flash from "express-flash";
// import logger from "morgan";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4001;

// Auth: Passport config
// require("./config/passport")(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Auth:
// app.use(logger("dev"));
app.use(cors());

// Auth: Sessions
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DB_STRING,
//     }),
//   })
// );

// Auth: Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

// Routes:
app.use(workoutRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pihxa.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
