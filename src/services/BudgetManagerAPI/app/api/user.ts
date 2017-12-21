import * as mongoose from "mongoose";
import * as express from "express";
import {UserModel} from "./../model/user";

export const api = {
  signup: signup,
};

function signup(User: UserModel) {
  return (req: express.Request, res: express.Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ success: false, message: 'Please, pass a username and password.' });
    } else {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      user.save().then(() => {
        res.json({ success: true, message: 'Account created successfully' });
      }, (error) => {
          return res.status(409).json({ success: false, message:  'Username already exists.' });
      });
    }
  }
}
