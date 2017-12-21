import * as mongoose from "mongoose";
import * as express from "express";
import {UserModel} from "./../model/user";
import {BudgetModel} from "./../model/budget";
import {ClientModel} from "./../model/client";

export const api = {
  store: store,
  getAll: getAll,
  getAllFromClient: getAllFromClient,
};

function store(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Client.findOne({ _id: req.body.client_id }).exec().then((client) => {

        if (client) {
          const budget = new Budget({
            client_id: req.body.client_id,
            user_id: req.body.user_id,
            client: client.name,
            state: req.body.state,
            title: req.body.title,
            total_price: req.body.total_price,
            items: req.body.items
          });

          budget.save(error => {
            if (error) res.status(400).json(error)
            res.status(200).json({ success: true, message: "Budget registered successfully" })
          })
        } else {
          res.status(400).json({ success: false, message: "Invalid client" })
        }
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function getAll(User: UserModel, Budget: BudgetModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Budget.find({ user_id: req.query.user_id }).then((budget) => {
        res.status(200).json(budget);

        return true;
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function getAllFromClient(User: UserModel, Budget: BudgetModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Budget.find({ client_id: req.query.client_id }).exec().then(( budget) => {
        res.status(200).json(budget);
        return true;
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}
