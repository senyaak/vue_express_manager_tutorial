import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as config from "../../config/index";
import * as express from "express";

const api = {
  login: login,
};

function login(User) {
  return (req: express.Request, res: express.Response) => {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
         throw error;
       }

      if (!user) {
        res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        user.comparePassword(req.body.password, (error, matches) => {
          if (matches && !error) {
            const token = jwt.sign({ user }, config.secret);
            res.json({ success: true, message: 'Token granted', token });
          } else {
            res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
          }
        });
      }
    });
  }
}
