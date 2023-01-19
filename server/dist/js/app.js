"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// Auth:
// import passport from "passport";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import flash from "express-flash";
// import logger from "morgan";
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001;
// Auth: Passport config
// require("./config/passport")(passport);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Auth:
// app.use(logger("dev"));
app.use((0, cors_1.default)());
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
app.use(routes_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pihxa.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
