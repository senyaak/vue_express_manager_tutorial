import * as express from "express";
import * as passport from "passport";
import * as config from "./../../config/index";
import {models} from "./../setup/index";
import * as User from "./../api/user";

export default function(app: express.Application) {
  const api = User.api;
  app.route('/api/v1/setup')
     .post(api.setup(models.User))
  app.route('/api/v1/users')
     .get(passport.authenticate('jwt', config.session),  api.index(models.User, app.get('budgetsecret')));
  app.route('/api/v1/signup')
     .post(api.signup(models.User));
}
