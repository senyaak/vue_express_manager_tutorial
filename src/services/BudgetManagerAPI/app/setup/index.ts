import * as mongoose from "mongoose";
import {User} from "./../model/user";
export const models = {
  User: mongoose.model('User')
}
