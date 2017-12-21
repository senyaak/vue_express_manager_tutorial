import * as mongoose from "mongoose";

export type ClientModel = mongoose.Model<IClient>;

export interface IClient extends mongoose.Document{
  name:  String,
  email: String,
  phone: String,
  user_id: mongoose.Schema.Types.ObjectId,
}

export const ClientSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export const Client: ClientModel = mongoose.model<IClient>("Client", ClientSchema);
