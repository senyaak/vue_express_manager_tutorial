import * as express from "express";
import * as passport from "passport";

import {api as budgetApi} from "./../api/client"
import {models} from "./../setup/index";
import * as config from "./../../config/index";

export default function(app: express.Application) {
  app.route('/api/v1/client')
     .post(
       passport.authenticate('jwt', config.session),
       budgetApi.store(models.User, models.Client, app.get('budgetsecret'))
     )
     .get(
       passport.authenticate('jwt', config.session),
       budgetApi.getAll(models.User, models.Client, app.get('budgetsecret'))
     )
     .delete(
       passport.authenticate('jwt', config.session),
       budgetApi.remove(models.User, models.Client, app.get('budgetsecret'))
     );

  app.route('/api/v1/client/single')
     .get(
       passport.authenticate('jwt', config.session),
       budgetApi.index(models.User, models.Client, app.get('budgetsecret'))
     )
     .put(
       passport.authenticate('jwt', config.session),
       budgetApi.edit(models.User, models.Client, app.get('budgetsecret'))
     );
}
