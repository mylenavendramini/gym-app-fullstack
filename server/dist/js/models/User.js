"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
// export interface AuthToken {
//     accessToken: string;
//     kind: string;
// }
const userSchema = new mongoose_1.Schema({
    profile: {
        name: String,
        // gender: String,
        // location: String,
        // website: String,
        // picture: String
    },
    email: { type: String, unique: true },
    password: String,
}, { timestamps: true });
// Password hash middleware.
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
// Helper method for validating user's password.
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
