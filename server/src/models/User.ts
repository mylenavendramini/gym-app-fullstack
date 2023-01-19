import bcrypt from "bcrypt";
import { model, Schema, Document } from "mongoose";
import { IUser } from "../types/user";

export type UserDocument = Document & {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  // facebook: string;
  // tokens: AuthToken[];

  profile: {
    name: string;
    // gender: string;
    // location: string;
    // website: string;
    // picture: string;
  };

  comparePassword: comparePasswordFunction;
  // gravatar: (size: number) => string;
};

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

// export interface AuthToken {
//     accessToken: string;
//     kind: string;
// }

const userSchema = new Schema<UserDocument>(
  {
    profile: {
      name: String,
      // gender: String,
      // location: String,
      // website: String,
      // picture: String
    },
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

// Password hash middleware.

userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword: any,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export const User = model<UserDocument>("User", userSchema);
