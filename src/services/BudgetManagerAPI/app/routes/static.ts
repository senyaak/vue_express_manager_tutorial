
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

import {api} from "./../api/auth";
import {models} from "./../setup/index";

const config: {frontend: string} = require("../../../../../config/config.json");
if(!config.frontend) {
  throw new Error("no frontend path defined in config.json");
}
const frontend = `${__dirname}/../../../../../${config.frontend}/`;

export default function(app: express.Application) {
  app.route("/").get((req, res) => res.sendFile(path.resolve(`${frontend}dist/index.html`)));
  app.use("/dist", express.static(path.resolve(`${frontend}dist`)));
};
