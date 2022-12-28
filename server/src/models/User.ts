import bcrypt from "bcrypt";
import { model, Schema, Document } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema<IUser> = new Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next: any) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err: any, salt: any) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err: any, hash: any) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, (err: any, isMatch: any) => {
    cb(err, isMatch);
  });
};

export default model<IUser & Document>("User", UserSchema);
