import * as mongoose from "mongoose";

export type BudgetModel = mongoose.Model<IBudget>;

export interface IBudget extends mongoose.Document{
  client: string;
  state: string;
  title: string;
  total_price: number;
  client_id: mongoose.Schema.Types.ObjectId;
}

export const BudgetSchema: mongoose.Schema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  total_price: {
    type: Number,
    required: true
  },

  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  items: [{}]
});

// mongoose.model('Budget', Schema);
export const Budget: BudgetModel = mongoose.model<IBudget>("Budget", BudgetSchema);
