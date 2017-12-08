import * as mongoose from "mongoose";
import "./../model/user";
import {IUser} from "./../model/user";

export const models = {
  User: mongoose.model<IUser>('User'),
};
[
  1,
  1,
  1,
]
