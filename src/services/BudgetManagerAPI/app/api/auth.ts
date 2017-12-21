import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as config from "../../config/index";
import * as express from "express";
import {UserModel} from "./../model/user";


function login(User: UserModel) {
  return (req: express.Request, res: express.Response) => {
    User.findOne({ username: req.body.username }).exec().then((user) => {
      if (!user) {
        res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        user.comparePassword(req.body.password).then((matches) => {
          if (matches) {
            const token = jwt.sign({ user }, config.secret);
            res.json({ success: true, message: 'Token granted', token, user});
          } else {
            res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
          }
        }, (error) => {
          res.sendStatus(400);
        });
      }
    }, (error) => {
      res.sendStatus(403);
    });
  }
}

// function verify(headers)  {
//   if (headers && headers.authorization) {
//     const split = headers.authorization.split(' ');
//     if (split.length === 2) {
//       return split[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }

export const api = {
  login: login,
  // verify: verify,
};
