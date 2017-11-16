import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser extends mongoose.Document{
  username: string;
  password: string;
  clients: IClient[];
}

interface IClient {
  email: string;
  name: string;
  phone: string;
  Budgets: IBudget[];
}

interface IBudget {
  state: string;
  title: string;
  price: number;
}
const Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clients: [{}]
});

Schema.pre('save', function (next) {
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

Schema.methods.comparePassword = function (password: string, callback: (err?: Error, matches?: boolean) => void) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", Schema);
