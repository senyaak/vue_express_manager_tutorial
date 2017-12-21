import * as express from "express";
import * as passport from "passport";
import * as config from "./../../config/index";
import {models} from "./../setup/index";
import * as User from "./../api/user";

export default function(app: express.Application) {
  const api = User.api;
  app.route('/api/v1/signup')
     .post(api.signup(models.User));
};
