import * as express from "express";
import {models} from "./../setup/index";
import {api} from "./../api/auth";
import * as bodyParser from "body-parser";

export default function(app: express.Application) {
  app.route('/')
     .get((req, res) => res.send('Budget Manager API'));
  app.route('/api/v1/auth')
     .post(bodyParser.json(), api.login(models.User));
}
