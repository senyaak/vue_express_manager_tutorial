import * as mongoose from "mongoose";

// require files to declare mongodb schemas
import "./../model/user";
import "./../model/budget";
import "./../model/client";
// ----------------!!----------------------
import {IUser} from "./../model/user";
import {IBudget} from "./../model/budget";
import {IClient} from "./../model/client";

export const models = {
  User: mongoose.model<IUser>('User'),
  Budget: mongoose.model<IBudget>('Budget'),
  Client: mongoose.model<IClient>('Client'),
};
