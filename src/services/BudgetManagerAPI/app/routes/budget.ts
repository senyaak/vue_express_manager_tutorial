import * as express from "express";
import * as passport from "passport";

import {api as budgetApi} from "./../api/budget"
import {models} from "./../setup/index";
import * as config from "./../../config/index";

export default function(app:express.Application) {
  app.route('/api/v1/budgets').post(
    passport.authenticate('jwt', config.session),
    budgetApi.store(models.User, models.Budget, models.Client, app.get('budgetsecret')),
  )
  .get(
    passport.authenticate('jwt', config.session),
    budgetApi.getAll(models.User, models.Budget, app.get('budgetsecret')),
  )
  .get(
    passport.authenticate('jwt', config.session),
    budgetApi.getAllFromClient(models.User, models.Budget, app.get('budgetsecret')),
  )
  .delete(
    passport.authenticate('jwt', config.session),
    budgetApi.remove(models.User, models.Budget, models.Client, app.get('budgetsecret')),
  );

  app.route('/api/v1/budget/single').get(
    passport.authenticate('jwt', config.session),
    budgetApi.index(models.User, models.Budget, models.Client, app.get('budgetsecret')),
  )
  .put(
    passport.authenticate('jwt', config.session),
    budgetApi.edit(models.User, models.Budget, models.Client, app.get('budgetsecret')),
  )

  app.route('/api/v1/budget/state').get(
    passport.authenticate('jwt', config.session),
    budgetApi.getByState(models.User, models.Budget, models.Client, app.get('budgetsecret')),
  )
}
