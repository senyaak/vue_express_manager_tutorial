import * as mongoose from "mongoose";
import * as express from "express";
import {UserModel} from "./../model/user";
import {BudgetModel} from "./../model/budget";
import {ClientModel} from "./../model/client";

export const api = {
  store: store,
  getAll: getAll,
  getAllFromClient: getAllFromClient,
  index: index,
  edit: edit,
  remove: remove,
  getByState: getByState,
};

function store(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Client.findById(req.body.client).then((client) => {
        if (client) {
          const budget = new Budget({
            client_id: req.body.client,
            user_id: req.query.user_id,
            client: client.name,
            state: req.body.state,
            description: req.body.description,
            title: req.body.title,
            total_price: req.body.total_price,
            items: req.body.items
          });

          budget.save().then((a) => {
            res.status(200).json({ success: true, message: "Budget registered successfully" })
          }).catch((error) => {
            res.status(400).json(error)
          });
        } else {
          res.status(400).json({ success: false, message: "Invalid client" })
        }
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
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
      return res.status(401).send({ success: false, message: 'Unauthorized' });
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


function index(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Budget.findById(req.query._id).then((budget) => {
            res.status(200).json(budget);
          }).catch((error) => {
            res.status(400).json(error);
          });
        } else {
          res.status(400).json({ success: false, message: "Invalid budget" })
        }
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function edit(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Budget.findByIdAndUpdate(req.body._id, req.body).then((budget) => {
            res.status(200).json(budget);
          }).catch((error) => {
            res.status(400).json(error);
          });
        } else {
          res.status(400).json({ success: false, message: "Invalid budget" })
        }
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function getByState(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Budget.find({ state: req.query.state }).then((budget) => {
            res.status(200).json(budget);
          }).catch((error) => {
            res.status(400).json(error);
          });
        } else {
          res.status(400).json({ success: false, message: "Invalid budget" })
        }
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function remove(User: UserModel, Budget: BudgetModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Budget.findByIdAndRemove(req.query._id).then((budget) => {
        res.status(200).json({ success: true, message: 'Removed successfully' });
      }).catch((error) => {
        res.status(400).json(error);
      });
    } else {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  }
}
