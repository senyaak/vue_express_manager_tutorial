
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

import {api} from "./../api/auth";
import {models} from "./../setup/index";

const config: {frontend: string} = require("../../../../../config/config.json");
const frontend = `${__dirname}/../../../../../${config.frontend}/`;
export default function(app: express.Application) {
  app.route("/")
    .get((req, res) => res.sendFile(path.resolve(`${frontend}dist/index.html`)));
  app.use("/dist", express.static(path.resolve(`${frontend}dist`)));
  // app.route("/dist/main.css")
  //   .get((req, res) => res.sendFile(path.resolve(__dirname, "./../../../../../../frontend/dist/main.css"),));
  // app.route("/dist/build.js")
  //   .get((req, res) => res.sendFile(path.resolve(__dirname, "./../../../../../../frontend/dist/build.js"),));
};
