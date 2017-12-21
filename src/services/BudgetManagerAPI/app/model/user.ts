import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export type UserModel = mongoose.Model<IUser>;

export interface IUser extends mongoose.Document{
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
           return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User: UserModel = mongoose.model<IUser>("User", UserSchema);
