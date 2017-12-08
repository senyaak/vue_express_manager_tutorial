import * as express from "express";
import {models} from "./../setup/index";
import {api} from "./../api/auth";
import * as bodyParser from "body-parser";
import * as path from "path";

export default function(app: express.Application) {
  app.route("/api/v1/auth")
     .post(bodyParser.json(), api.login(models.User));
};
