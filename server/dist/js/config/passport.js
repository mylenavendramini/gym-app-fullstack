"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const User_1 = require("../models/User");
const LocalStrategy = passport_local_1.default.Strategy;
// passport.use(
//   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//     User.findOne(
//       { email: email.toLowerCase() },
//       (err: NativeError, user: UserDocument) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(undefined, false, {
//             message: `Email ${email} not found.`,
//           });
//         }
//         user.comparePassword(password, (err: Error, isMatch: boolean) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(undefined, user);
//           }
//           return done(undefined, false, {
//             message: "Invalid email or password.",
//           });
//         });
//       }
//     );
//   })
// );
// passport.serializeUser<any, any>((req, user, done) => {
//   done(undefined, user);
// });
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
// });
module.exports = function () {
    passport_1.default.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(undefined, false, {
                    message: `Email ${email} not found.`,
                });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, {
                    message: "Invalid email or password.",
                });
            });
        });
    }));
    passport_1.default.serializeUser((req, user, done) => {
        done(undefined, user);
    });
    passport_1.default.deserializeUser((id, done) => {
        User_1.User.findById(id, (err, user) => done(err, user));
    });
};
// Login Required middleware.
// export const isAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// };
