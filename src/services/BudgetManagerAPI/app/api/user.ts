import * as mongoose from "mongoose";
import * as express from "express";
import {UserModel} from "./../model/user";

export const api = {
  setup: setup,
  index: index,
  signup: signup,
};

function signup(User: UserModel) {
  return (req: express.Request, res: express.Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ success: false, message: 'Please, pass a username and password.' });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        clients: []
      });
      newUser.save().then(() => {
        res.json({ success: true, message: 'Account created successfully' });
      }, (error) => {
          return res.status(409).json({ success: false, message:  'Username already exists.' });
      })
    }
  }
}

// FIXME remove for production
function index(User: UserModel, BudgetToken: string) {
  return (req: express.Request, res: express.Response) => {
    const token = BudgetToken;
    if (token) {
      User.find({}).exec().then(
        (users) => {
          res.status(200).json(users);
        }, (error) => {
          res.sendStatus(404);
        }
      );
    } else {
      return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
  }
}

// FIXME remove for production
function setup(User: UserModel) {
  return (req: express.Request, res: express.Response) => {
    const admin = new User({
      username: 'admin',
      password: 'admin',
      clients: []
    });
    admin.save().then(() => {
      console.log('Admin account was succesfully set up');
      res.json({ success: true });
    }, (error) => {
      res.status(400).json({success: false, message: "Can't create user"});
    })
  }
}
