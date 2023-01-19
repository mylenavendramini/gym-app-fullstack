import passport from "passport";
import passportLocal from "passport-local";

import { User, UserDocument } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

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
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne(
        { email: email.toLowerCase() },
        (err: NativeError, user: UserDocument) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, {
              message: `Email ${email} not found.`,
            });
          }
          user.comparePassword(password, (err: Error, isMatch: boolean) => {
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
        }
      );
    })
  );

  passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) =>
      done(err, user)
    );
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
