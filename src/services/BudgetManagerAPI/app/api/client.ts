import * as mongoose from "mongoose";
import * as express from "express";
import {UserModel} from "./../model/user";
import {ClientModel} from "./../model/client";

export const api = {
  store: store,
  getAll: getAll,
  index: index,
  edit: edit,
  remove: remove,
};



function store(User: UserModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          const client = new Client({
            user_id: req.query.user_id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          });

          client.save().then(() => {
            res.status(200).json({ success: true, message: "Client registration successful" });
          }).catch(error => {
            res.status(400).json(error)
          });
        } else {
          res.status(400).json({ success: false, message: "Invalid client" })
        }
      }).catch((error) => {
        if (error) {
          res.status(400).json(error);
        }
      });

    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}

function getAll(User: UserModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      Client.find({ user_id: req.query.user_id }).then((client) => {
        res.status(200).json(client);
        return true;
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}


function index(User: UserModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Client.findById(req.query._id).then((client) => {
            res.status(200).json(client);
          }).catch((error) => {
            res.status(400).json(error);
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

function edit(User: UserModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Client.findByIdAndUpdate(req.body._id, req.body).then((client) => {
            res.status(200).json(client);
          }).catch((error) => {
            res.status(400).json(error);
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

function remove(User: UserModel, Client: ClientModel, Token: string) {
  return (req: express.Request, res: express.Response) => {
    if (Token) {
      User.findById(req.query.user_id).then((user) => {
        if (user) {
          Client.findByIdAndRemove(req.query._id).then((client) => {
            res.status(200).json({ success: true, message: 'Removed successfully' });
          }).catch((error) => {
            res.status(400).json(error);
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
